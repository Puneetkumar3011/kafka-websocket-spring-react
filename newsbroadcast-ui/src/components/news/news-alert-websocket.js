import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

const webSocketEndPoint = 'http://localhost:7000/newsAlert';
const TOPIC = '/topic/newsReceived';
let stompClient = null;

export const connectSocket = callBackFunc => {
    let ws = new SockJS(webSocketEndPoint);
    stompClient = Stomp.over(ws);

    stompClient.connect({}, frame => {
        stompClient.subscribe(TOPIC, sdkEvent => {
            onMessageReceived(sdkEvent);
            callBackFunc(sdkEvent);
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
    console.log("calling logout api via web socket");
    stompClient.send("/newsBroadcastApp/newNewsAlert", {}, JSON.stringify(message));
};

const onMessageReceived = message => {
    console.log("Message Recieved from Server :: " + message);
};

const errorCallBack = error => {
    console.log("Error connecting socket:- " + error);
}