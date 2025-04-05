import {useEffect} from "react";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

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
            onDisconnect: () => {
                console.log("Disconnected from WebSocket");
            },
            webSocketFactory: () => new SockJS("http://localhost:8080/ws")
        });

        client.activate();

        return () => {
            client.deactivate();
        };
    }, [onMessageReceived]);
}