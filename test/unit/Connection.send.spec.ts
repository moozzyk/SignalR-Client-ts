
/// <reference path="../../typings/index.d.ts" />
import * as signalR from "../../src/Connection"
import { IHttpClient } from "../../src/IHttpClient"
import { ITransport } from "../../src/ITransport"
import { ISignalROptions } from "../../src/ISignalROptions"

describe("Connection", () => {
    it("send throws if the connection is not started", () => {
        let connection = new signalR.Connection("https://test");
        expect(() => connection.send(undefined))
            .toThrow(new Error("Cannot send data when the connection is not in the Connected state."));
    });

    it("send sends messages using transport", done => {
        var lastMessage: string;
        let transport: ITransport = <ITransport>{
            getName(): string {
                return "fakeTransport";
            },
            start(url: string): Promise<void>{
                return Promise.resolve();
            },
            send(data: string):void {
                lastMessage = data;
            },
            onMessageReceived: (m: string) => {}
        };

        let options: ISignalROptions = {
            httpClient: <IHttpClient>{
                get(url: string): Promise<string> {
                    if (url.indexOf("negotiate") >= 0) {
                        return Promise.resolve(JSON.stringify({
                            ProtocolVersion: "1.5",
                            TransportConnectTimeout: 10,
                            ConnectionToken: "connectionToken",
                            ConnectionId: "connectionId",
                            KeepAliveTimeout: 20.0,
                            DisconnectTimeout: 30.0
                        }));
                    }
                    else {
                      transport.onMessageReceived("{\"C\":\"s-0\",\"S\":1,\"M\":[]}");
                      return Promise.resolve();
                  }
               }
            },
            transport: transport
        } as ISignalROptions;

        let connection = new signalR.Connection("https://fakeuri", undefined, undefined, options);
        connection.start()
        .then(() => {
            connection.send("test");
            expect(lastMessage).toBe("test");
            done();
        })
        .catch((e:Error) => {
            expect(false).toBe(true);
            done();
        })
    });

    // TODO: it("send invokes error handler if transport fails to send message")
});