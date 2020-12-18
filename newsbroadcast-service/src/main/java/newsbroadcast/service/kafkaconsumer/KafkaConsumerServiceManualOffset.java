package newsbroadcast.service.kafkaconsumer;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.listener.AcknowledgingMessageListener;
import org.springframework.kafka.support.Acknowledgment;

//@Component
@Slf4j
public class KafkaConsumerServiceManualOffset implements AcknowledgingMessageListener<String,String> {
    /* Uncomment @Component in case of ManualOffset */
    @Override
    @KafkaListener(topics="${kafkaTopicNews}")
    public void onMessage(ConsumerRecord<String, String> consumerRecord, Acknowledgment acknowledgment) {
        log.info("ConsumerRecord : {} ", consumerRecord );
        acknowledgment.acknowledge();
    }
}
