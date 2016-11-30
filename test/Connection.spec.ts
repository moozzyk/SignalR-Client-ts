/// <reference path="../typings/index.d.ts" />
import * as signalR from "../src/Connection"
import {IHttpClient} from "../src/IHttpClient"

describe("Connection", () => {
    it("is created in disconnected state", () => {
        let connection = new signalR.Connection("https://test");
        expect(connection.state === signalR.ConnectionState.Disconnected).toEqual(true)
    });

    it("fails to connect if negotiate fails", done => {
        let fakeHttpClient = <IHttpClient>{
          get(url: string) : Promise<string> { return Promise.reject({status:"400", statusText: "Bad request"}) }
        };
        let connection = new signalR.Connection("https://fakeuri", undefined, undefined, fakeHttpClient);

        connection.start()
            .then(() => {
                expect(false).toBe(true);
                done();
            })
            .catch(e => {
                expect(e.status).toBe("400");
                expect(e.statusText).toBe("Bad request");
                done();
            });
    });

    it("fails to connect if protocol version not 1.5", done => {
        let fakeHttpClient = <IHttpClient>{
            get(url: string) : Promise<string> { return Promise.resolve("{ \"ProtocolVersion\": \"1.2\"}"); }
        };
        let connection = new signalR.Connection("https://fakeuri", undefined, undefined, fakeHttpClient);

        connection.start()
            .then(() => {
                expect(false).toBe(true);
                done();
            })
            .catch((e: Error) => {
                console.log(e);
                expect(e.message).toBe("Unsupported protocol version: 1.2");
                done();
            });
    });

    xit("fails to start if init not received within ConnectionTimeOut", done => {
        let fakeHttpClient = <IHttpClient>{
            get(url: string) : Promise<string> {
                return Promise.resolve(JSON.stringify({
                    ProtocolVersion: "1.5",
                    TransportConnectTimeout: 0.5,
                    ConnectionToken: "connectionToken",
                    ConnectionId: "connectionId",
                    KeepAliveTimeout: 20.0,
                    DisconnectTimeout: 30.0
                  }));
            }
        };
        let connection = new signalR.Connection("https://fakeuri", undefined, undefined, fakeHttpClient);
        connection.start()
          .then(() => {
              expect(false).toBe(true);
              done();
          })
          .catch((e:Error) => {
              expect(e.message).toBe("Timeout starting connection");
              done();
          })
          done();
    });
});