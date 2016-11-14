namespace SignalR {
    export interface INegotiateResponse {
        Url: string,
        ConnectionToken: string,
        ConnectionId: string,
        KeepAliveTimeout: number,
        DisconnectTimeout: number,
        ConnectionTimeout: number,
        TryWebSockets: boolean,
        ProtocolVersion: string,
        TransportConnectTimeout: number,
        LongPollDelay: number
    }
}