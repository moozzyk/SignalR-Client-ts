
namespace SignalR {

    export enum ConnectionState {
        Disconnected
    }

    export class Connection {
        private connectionState: ConnectionState;
        private httpClient: IHttpClient;

        constructor(httpClient?: IHttpClient) {
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

            throw new Error("Not implemented");
        }
    }
}