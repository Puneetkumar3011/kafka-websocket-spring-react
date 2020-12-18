import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

const webSocketEndPoint = 'http://localhost:7000/breakingNewsAlert';
const TOPIC = '/topic/breakingNewsReceived';
let stompClient = null;

export const connectSocket = callBackFunc => {
    let ws = new SockJS(webSocketEndPoint);
    stompClient = Stomp.over(ws);

    stompClient.connect({}, frame => {
        stompClient.subscribe(TOPIC, sdkEvent => {
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

const errorCallBack = error => {
    console.log("Error connecting socket:- " + error);
}