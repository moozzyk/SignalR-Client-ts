export declare type MessageReceived = (message: string) => void;
export declare type ErrorReceived = (e: Error) => void;

export interface ITransport {
    getName(): string;
    start(url: string): Promise<void>;
    send(data: string): void;
    // TODO: stop
    onMessageReceived: MessageReceived;
    onError: ErrorReceived;
}