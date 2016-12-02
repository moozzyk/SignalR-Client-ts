/// <reference path="../typings/index.d.ts" />
import * as signalR from "../src/Connection"
import { IHttpClient } from "../src/IHttpClient"
import { ITransport } from "../src/ITransport"
import { ISignalROptions } from "../src/ISignalROptions"

describe("Connection", () => {
    it("fails to connect if negotiate fails", done => {
        let options: ISignalROptions = {
            httpClient: <IHttpClient>{
                get(url: string) : Promise<string> {
                    return Promise.reject({status:"400", statusText: "Bad request"});
                }
            }
        };

        let connection = new signalR.Connection("https://fakeuri", undefined, undefined, options);

        connection.start()
            .then(() => {
                expect(false).toBe(true);
                done();
            })
            .catch(e => {
                expect(e.status).toBe("400");
                expect(e.statusText).toBe("Bad request");
                expect(connection.state).toBe(signalR.ConnectionState.Disconnected);
                done();
            });
    });

    it("fails to connect if protocol version not 1.5", done => {
        let options: ISignalROptions = {
            httpClient: <IHttpClient>{
                get(url: string) : Promise<string> {
                  return Promise.resolve("{ \"ProtocolVersion\": \"1.2\"}");
                }
            }
        } as ISignalROptions;

        let connection = new signalR.Connection("https://fakeuri", undefined, undefined, options);

        connection.start()
            .then(() => {
                expect(false).toBe(true);
                done();
            })
            .catch((e: Error) => {
                expect(e.message).toBe("Unsupported protocol version: '1.2'.");
                expect(connection.state).toBe(signalR.ConnectionState.Disconnected);
                done();
            });
    });

    it("fails to start if transport fails to start", done => {
        let transport: ITransport = <ITransport>{
            getName(): string {
                return "fakeTransport";
            },
            start(url: string): Promise<void>{
                return Promise.reject(new Error("Start failed."));
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
                      return Promise.resolve();
                  }
               }
            },
            transport: transport
        } as ISignalROptions;

        let connection = new signalR.Connection("https://fakeuri", undefined, undefined, options);
        connection.start()
        .then(() => {
            expect(false).toBe(true);
            done();
        })
        .catch((e:Error) => {
            expect(e.message).toBe("Start failed.");
            expect(connection.state).toBe(signalR.ConnectionState.Disconnected);
            done();
        })
    });

    it("fails to start if start request fails", done => {
        let transport: ITransport = <ITransport>{
            getName(): string {
                return "fakeTransport";
            },
            start(url: string): Promise<void>{
                return Promise.resolve();
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
                      return Promise.reject(new Error("Start request failed."));
                  }
               }
            },
            transport: transport
        } as ISignalROptions;

        let connection = new signalR.Connection("https://fakeuri", undefined, undefined, options);
        connection.start()
        .then(() => {
            expect(false).toBe(true);
            done();
        })
        .catch((e:Error) => {
            expect(e.message).toBe("Start request failed.");
            expect(connection.state).toBe(signalR.ConnectionState.Disconnected);
            done();
        })
    });

    it("fails to start if init not received within ConnectionTimeOut", done => {
        let transport: ITransport = <ITransport>{
            getName(): string {
                return "fakeTransport";
            },
            start(url: string): Promise<void>{
                return Promise.resolve();
            },
            onMessageReceived: (m: string) => {}
        };

        let options: ISignalROptions = {
            httpClient: <IHttpClient>{
                get(url: string): Promise<string> {
                    if (url.indexOf("negotiate") >= 0) {
                        return Promise.resolve(JSON.stringify({
                            ProtocolVersion: "1.5",
                            TransportConnectTimeout: 0.1,
                            ConnectionToken: "connectionToken",
                            ConnectionId: "connectionId",
                            KeepAliveTimeout: 20.0,
                            DisconnectTimeout: 30.0
                        }));
                    }
                    else {
                      return Promise.resolve();
                  }
               }
            },
            transport: transport
        } as ISignalROptions;

        let connection = new signalR.Connection("https://fakeuri", undefined, undefined, options);
        connection.start()
        .then(() => {
            expect(false).toBe(true);
            done();
        })
        .catch((e:Error) => {
            expect(e.message).toBe("Timeout starting connection.");
            expect(connection.state).toBe(signalR.ConnectionState.Disconnected);
            done();
        })
    });

    it("fails to start if transport fails after starting", done => {
        let transport: ITransport = <ITransport>{
            getName(): string {
                return "fakeTransport";
            },
            start(url: string): Promise<void>{
                return Promise.resolve();
            },
            onMessageReceived: (m: string) => {},
            onError: (e: Error) => {}
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
                      transport.onError(new Error("Transport disconnected."));
                      return Promise.resolve();
                  }
               }
            },
            transport: transport
        } as ISignalROptions;

        let connection = new signalR.Connection("https://fakeuri", undefined, undefined, options);
        connection.start()
        .then(() => {
            expect(false).toBe(true);
            done();
        })
        .catch((e:Error) => {
            expect(e.message).toBe("Transport failed when starting connection. Error: Transport disconnected.");
            expect(connection.state).toBe(signalR.ConnectionState.Disconnected);
            done();
        })
    });

    it("can be started", done => {
        let transport: ITransport = <ITransport>{
            getName(): string {
                return "fakeTransport";
            },
            start(url: string): Promise<void>{
                return Promise.resolve();
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
            expect(true).toBe(true);
            expect(connection.state).toBe(signalR.ConnectionState.Connected);
            done();
        })
        .catch((e:Error) => {
            expect(false).toBe(true);
            done();
        })
    });
});