/// <reference path="../../typings/index.d.ts" />
import * as signalR from "../../src/Connection"
import { IHttpClient } from "../../src/IHttpClient"
import { ITransport } from "../../src/ITransport"
import { ISignalROptions } from "../../src/ISignalROptions"

describe("Connection", () => {
    it("is created in disconnected state", () => {
        let connection = new signalR.Connection("https://test");
        expect(connection.state).toEqual(signalR.ConnectionState.Disconnected);
    });
});