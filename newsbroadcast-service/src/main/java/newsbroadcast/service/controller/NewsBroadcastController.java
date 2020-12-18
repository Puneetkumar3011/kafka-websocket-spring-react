package newsbroadcast.service.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class NewsBroadcastController {

    @MessageMapping("/newNewsAlert")
    @SendTo("/topic/newsReceived")
    public String newsReceived(String message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new String("News Alert, " + message + " !");
    }

    @MessageMapping("/breakingNewsAlert")
    @SendTo("/topic/breakingNewsReceived")
    public String breakingNewsReceived(String message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new String("Breaking News, " + message + " !");
    }

}
