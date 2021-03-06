package newsbroadcast.service.config;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.kafka.ConcurrentKafkaListenerContainerFactoryConfigurer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.dao.RecoverableDataAccessException;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.config.KafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.listener.ConcurrentMessageListenerContainer;
import org.springframework.kafka.listener.ContainerProperties;
import org.springframework.retry.RetryPolicy;
import org.springframework.retry.backoff.FixedBackOffPolicy;
import org.springframework.retry.policy.SimpleRetryPolicy;
import org.springframework.retry.support.RetryTemplate;

import java.util.HashMap;
import java.util.Map;

@EnableKafka
@Configuration
@Slf4j
public class KafkaConsumerConfig {
	@Bean
	ConcurrentKafkaListenerContainerFactory<?, ?> kafkaListenerContainerFactory(
			ConcurrentKafkaListenerContainerFactoryConfigurer configurer,
			ConsumerFactory<Object, Object> kafkaConsumerFactory) {
		ConcurrentKafkaListenerContainerFactory<Object, Object> factory = new ConcurrentKafkaListenerContainerFactory<>();
		configurer.configure(factory, kafkaConsumerFactory);

		/* non-cloud environment */
		/* I t will run 3 threads, pointing to 3 different partitions  */
		// factory.setConcurrency(3);

		/* default mode is BATCH; But some logic needed to set offset after manually then below line can be used */
		 factory.getContainerProperties().setAckMode(ContainerProperties.AckMode.MANUAL);

		factory.setErrorHandler(((thrownException, data) -> {
			log.info("Exception in consumerConfig {} and the record is {}", thrownException.getMessage(), data);
		}));
		factory.setRetryTemplate(retryTemplate());
		factory.setRecoveryCallback((context -> {
			if(context.getLastThrowable().getCause() instanceof RecoverableDataAccessException){
				log.info("Inside the recoverable logic");
			}else{
				log.info("Inside the non recoverable logic");
				throw new RuntimeException(context.getLastThrowable().getMessage());
			}
			return null;
		}));
		return factory;
	}

	/* Retry logic */
	private RetryTemplate retryTemplate() {
		FixedBackOffPolicy fixedBackOffPolicy = new FixedBackOffPolicy();
		fixedBackOffPolicy.setBackOffPeriod(1000);
		RetryTemplate retryTemplate = new RetryTemplate();
		retryTemplate.setRetryPolicy(simpleRetryPolicy());
		retryTemplate.setBackOffPolicy(fixedBackOffPolicy);
		return  retryTemplate;
	}

	/* recovery policy */
	private RetryPolicy simpleRetryPolicy() {
        /*SimpleRetryPolicy simpleRetryPolicy = new SimpleRetryPolicy();
        simpleRetryPolicy.setMaxAttempts(3);*/

		Map<Class<? extends Throwable>, Boolean> exceptionsMap = new HashMap<>();
		exceptionsMap.put(IllegalArgumentException.class, false);
		exceptionsMap.put(RecoverableDataAccessException.class, true);
		SimpleRetryPolicy simpleRetryPolicy = new SimpleRetryPolicy(3,exceptionsMap,true);
		return simpleRetryPolicy;
	}
}
