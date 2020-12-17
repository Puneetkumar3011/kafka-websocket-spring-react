import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

const webSocketEndPoint = 'http://localhost:7000/breakingNewsAlert';
const TOPIC = '/topic/breakingNewsReceived';
let stompClient= null;

export const connectSocket = () => {
    let ws = new SockJS(webSocketEndPoint);
    stompClient = Stomp.over(ws);

    stompClient.connect({}, frame => {
        stompClient.subscribe(TOPIC, sdkEvent => {
            onMessageReceived(sdkEvent);
        });
    }, errorCallBack);

    console.log("Socket connected");
};

export const disconnectSocket = () => {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Socket disconnected");
};

export const sendMessage = message => {
    stompClient.send("/newsBroadcastApp/breakingNewsAlert", {}, JSON.stringify(message));
};

const onMessageReceived = message => {
    console.log("Message Recieved from Server :: " + message);
};

const errorCallBack = error => {
    console.log("Error connecting socket:- " + error);
}