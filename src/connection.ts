/// <reference path="Common.ts" />

namespace SignalR {

    export enum ConnectionState {
        Disconnected,
        Connecting,
        Connected
    }

    export class Connection {
        private httpClient: IHttpClient;
        private url: string;
        private queryString: string;
        private logging: boolean;
        private connectionToken: string;
        private connectionId: string;
        private keepAliveTimeout: number;
        private disconnectTimeout: number;
        private transport: ITransport;
        private connectionState: ConnectionState;

        constructor(url: string, queryString?: string, logging?:boolean,  httpClient?: IHttpClient) {
            this.url = url;
            this.queryString = (queryString && queryString[0] === '?')
                ? queryString.slice(1)
                : queryString;
            this.logging = logging || true;
            this.httpClient = httpClient || new HttpClient();

            this.connectionState = ConnectionState.Disconnected;
        }

        public get state(): ConnectionState {
            return this.connectionState;
        }

        public start(): Promise<void> {
            if (this.connectionState !== ConnectionState.Disconnected) {
                throw new Error("Cannot start a connection that is not in the disconnected state.");
            }

            this.changeState(ConnectionState.Connecting);

            return this.negotiate()
                .then(negotiateResponse => {
                    this.connectionToken = negotiateResponse.ConnectionToken;
                    this.connectionId = negotiateResponse.ConnectionId;
                    this.keepAliveTimeout = negotiateResponse.KeepAliveTimeout;
                    this.disconnectTimeout = negotiateResponse.DisconnectTimeout;

                    return this.tryStartTransport(negotiateResponse.ConnectionTimeout);
                })
                .then(transport => {
                    this.transport = transport;
                    this.changeState(ConnectionState.Connected);
                })
                .catch(e => {
                    this.log(`No transports could be started: ${e}`);
                    this.changeState(ConnectionState.Disconnected)
                    throw e;
                });
        }

        private negotiate(): Promise<INegotiateResponse> {
            return this.httpClient.get(buildNegotiate(this.url, this.queryString))
            .then(response => {
                let negotiateResponse = JSON.parse(response) as INegotiateResponse;
                if (negotiateResponse.ProtocolVersion != PROTOCOL_VERSION) {
                    throw new Error(`Unsupported protocol version: ${negotiateResponse.ProtocolVersion}`);
                }
                return negotiateResponse;
            });
        }

        private tryStartTransport(connectionTimeout: number): Promise<ITransport> {
            let initCallback: () => void;

            var initPromise = new Promise((reject, resolve) => {
                initCallback = resolve;
                setTimeout(() => {
                        console.log("Timeout starting connection");
                        reject();
                    }, connectionTimeout * 1000);
            });

            let transport = new WebSocketsTransport();
            transport.onMessageReceived = (message: string) => {
                this.onMessageReceived(message, initCallback);
            };

            return transport.start(buildConnect(this.url, transport.getName(), this.connectionToken, this.queryString))
                .then(() => {
                    let startPromise = new HttpClient().get(
                        buildStart(this.url, transport.getName(), this.connectionToken, this.queryString));

                    return startPromise
                        .then(() => initPromise)
                        .then(() => transport);
                })
        }

        private onMessageReceived(message: string, initCallback: () => void) {
            if (!message) {
                return;
            }

            let m = JSON.parse(message);

            if (m.S === 1) {
                initCallback();
                return;
            }
        }

        private changeState(newState: ConnectionState): void {
            this.log(`${this.connectionState} -> ${newState}`);
            this.connectionState = newState;
        }

        private log(error: any) {
            if (this.logging) {
                console.log(error);
            }
        }
    }
}