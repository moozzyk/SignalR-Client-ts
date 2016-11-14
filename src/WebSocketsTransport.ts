namespace SignalR {
    export class WebSocketsTransport implements ITransport {
        public getName() {
            return "webSockets";
        }

        public start(url: string): Promise<void> {
            throw new Error("Not implemented.");
        }

        public onMessageReceived: MessageReceived;
    }
}