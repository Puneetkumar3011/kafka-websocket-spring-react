package newsbroadcastproduer.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import newsbroadcastproduer.domain.News;
import newsbroadcastproduer.domain.NewsType;
import newsbroadcastproduer.producer.NewsEventProducer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@CrossOrigin( origins = "*" )
@RestController
@Slf4j
public class NewsEventController {
    @Autowired
    private NewsEventProducer newsEventProducer;

    @PostMapping("/broadcastNewsAlert")
    public ResponseEntity<News> broadcastNewsAlert(@RequestBody News news) throws JsonProcessingException {
        if(news == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }

        String uuid = UUID.randomUUID().toString();
        news.setId(uuid);
        /* invoke kafka producer */
        newsEventProducer.sendProductEventAsynchronousWithRecordHeader(news);
        return ResponseEntity.status(HttpStatus.CREATED).body(news);
    }

}
