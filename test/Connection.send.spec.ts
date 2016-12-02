
/// <reference path="../typings/index.d.ts" />
import * as signalR from "../src/Connection"
import { IHttpClient } from "../src/IHttpClient"
import { ITransport } from "../src/ITransport"
import { ISignalROptions } from "../src/ISignalROptions"

describe("Connection", () => {
    it("send throws if the connection is not started", () => {
        let connection = new signalR.Connection("https://test");
        expect(() => connection.send(undefined))
            .toThrow(new Error("Cannot send data when the connection is not in the Connected state."));
    });
});