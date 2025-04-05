import {useEffect} from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

window.global = window;

export const useWebSocket = (onMessageReceived) => {
    useEffect(() => {
        const client = new Client({
            brokerURL: "ws://localhost:8080/ws",
            onConnect: () => {
                client.subscribe("/topic/gradeDistribution", (message) => {
                    if (message.body === "update") {
                        onMessageReceived();
                    }
                });
            },
            webSocketFactory: () => new SockJS("http://localhost:8080/ws")
        });
        client.activate();
    }, [onMessageReceived]);
}