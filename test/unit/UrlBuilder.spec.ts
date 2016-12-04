/// <reference path="../../typings/index.d.ts" />
import * as urlBuilder from "../../src/UrlBuilder"

describe("UrlBuilder", () => {
    it("builds negotiate", () => {
        expect(urlBuilder.buildNegotiate("https://test", "a=b"))
            .toEqual("https://test/negotiate?clientProtocol=1.5&a=b");
    });

    it("builds connect", () => {
        expect(urlBuilder.buildConnect("https://test", "myTransport", "connection$token", "a=b"))
            .toEqual("https://test/connect?clientProtocol=1.5&transport=myTransport&connectionToken=connection%24token&a=b");
    });

    it("builds start", () => {
        expect(urlBuilder.buildStart("https://test", "myTransport", "connection$token", "a=b"))
            .toEqual("https://test/start?clientProtocol=1.5&transport=myTransport&connectionToken=connection%24token&a=b");
    });
});