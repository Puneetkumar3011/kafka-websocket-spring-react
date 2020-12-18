package newsbroadcast.service.kafkaconsumer;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class KafkaConsumer {
	
	@Autowired
	SimpMessagingTemplate template;

	@KafkaListener(topics="${kafkaTopicNews}")
	public void newsReceived(ConsumerRecord<String,String> consumerRecord) {
		log.info("ConsumerRecord : {} ", consumerRecord );
		template.convertAndSend("/topic/newsReceived", consumerRecord.value());
	}

	@KafkaListener(topics="${kafkaTopicBreakingNews}")
	public void breakingNewsReceived(ConsumerRecord<String,String> consumerRecord) {
		log.info("ConsumerRecord : {} ", consumerRecord );
		template.convertAndSend("/topic/breakingNewsReceived", consumerRecord.value());
	}
}
