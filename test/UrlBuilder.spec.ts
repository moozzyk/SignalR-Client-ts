/// <reference path="../typings/index.d.ts" />
/// <reference path="../artifacts/lib/SignalR.d.ts" />

describe("UrlBuilder", () => {
    it("builds negotiate", () => {
        expect(SignalR.buildNegotiate("https://test", "a=b"))
            .toEqual("https://test/negotiate?clientProtocol=1.5&a=b");
    });

    it("builds connect", () => {
        expect(SignalR.buildConnect("https://test", "myTransport", "connection_token", "a=b"))
            .toEqual("https://test/connect?clientProtocol=1.5&transport=myTransport&connectionToken=connection_token&a=b");
    });
});