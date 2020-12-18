package newsbroadcast.service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {
	
	@Autowired
	SimpMessagingTemplate template;

	@KafkaListener(topics="${kafkaTopicNews}")
	public void newsReceived(@Payload String message) {
		template.convertAndSend("/topic/newsReceived", message);
	}

	@KafkaListener(topics="${kafkaTopicBreakingNews}")
	public void breakingNewsReceived(@Payload String message) {
		template.convertAndSend("/topic/breakingNewsReceived", message);
	}
}
