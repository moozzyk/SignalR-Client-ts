namespace signalR {
    export enum connectionState {
        disconnected
    }

    export class connection {
        private _state : connectionState;

        constructor() {
            this._state = connectionState.disconnected;
        }

        public get state(): connectionState {
            return this._state;
        }

        public start() {
            if (this._state !== connectionState.disconnected) {
                throw new Error("Cannot start a connection that is not in the disconnected state.");
            }
        }
    }
}