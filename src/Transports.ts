import { ITransport } from "./ITransport"
import { MessageReceived, ErrorReceived } from "./Common"

export class WebSocketsTransport implements ITransport {
    private webSocket: WebSocket;

    public getName() {
        return "webSockets";
    }

    public start(url: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            url = url.replace(/^http/, "ws");

            let webSocket = new WebSocket(url);
            let thisWebSocketTransport = this;

            webSocket.onopen = (event: Event) => {
                console.log(`WebSocket connected to ${url}`);
                thisWebSocketTransport.webSocket = webSocket;
                resolve();
            };

            webSocket.onerror = (event: Event) => {
                reject();
            };

            webSocket.onmessage = (message: MessageEvent) => {
                console.log(`(WebSockets transport) data received: ${message.data}`);
                if (thisWebSocketTransport.onMessageReceived) {
                    thisWebSocketTransport.onMessageReceived(message.data);
                }
            }

            webSocket.onclose = (event: CloseEvent) => {
                // webSocket will be null if the transport did not start successfully
                if (thisWebSocketTransport.webSocket && event.wasClean === false) {
                    if (thisWebSocketTransport.onError) {
                        thisWebSocketTransport.onError(new Error(`WebSocket closed. Reason: '${event.reason}'. Error code: ${event.code}.`));
                    }
                }
            }
        });
    }

    public send(data: string) {
        this.webSocket.send(data);
    }

    public stop() {
        this.webSocket.close();
        this.webSocket = null;
    }

    public onMessageReceived: MessageReceived;
    public onError: ErrorReceived;
}
