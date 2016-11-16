export declare type MessageReceived = (message: string) => void;

export interface ITransport {
    getName(): string;
    start(url: string): Promise<void>;
    onMessageReceived: MessageReceived;
}