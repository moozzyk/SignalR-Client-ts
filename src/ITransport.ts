import { MessageReceived, ErrorReceived } from "./Common"

export interface ITransport {
    getName(): string;
    start(url: string): Promise<void>;
    send(data: string): void;
    stop(): void;
    onMessageReceived: MessageReceived;
    onError: ErrorReceived;
}