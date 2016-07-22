namespace signalR {
    export enum connectionState {
        disconnected
    }

    export class connection {
        public get state(): connectionState {
            return connectionState.disconnected;
        }
    }
}