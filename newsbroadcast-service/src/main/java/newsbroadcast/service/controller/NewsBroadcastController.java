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
        return new String("Hello, " + message + " !");
    }

}
