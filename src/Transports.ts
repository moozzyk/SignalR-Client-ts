import { ITransport, MessageReceived, ErrorReceived } from "./ITransport"

export class WebSocketsTransport implements ITransport {
    public getName() {
        return "webSockets";
    }

    public start(url: string): Promise<void> {
        throw new Error("Not implemented.");
    }

    public onMessageReceived: MessageReceived;
    public onError: ErrorReceived;
}
