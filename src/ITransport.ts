export declare type MessageReceived = (message: string) => void;
export declare type ErrorReceived = (e: Error) => void;

export interface ITransport {
    getName(): string;
    start(url: string): Promise<void>;
    send(data: string): void;
    stop(): void;
    onMessageReceived: MessageReceived;
    onError: ErrorReceived;
}