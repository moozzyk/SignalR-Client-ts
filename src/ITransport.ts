namespace SignalR {
    export interface ITransport {
        getName(): string;
        start(url: string): Promise<void>;
        onMessageReceived: MessageReceived;
    }
}