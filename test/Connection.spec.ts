/// <reference path="../typings/index.d.ts" />
import * as signalR from "../src/Connection"

describe('Connection', function() {
    it('is created in disconnected state', function() {
      var connection = new signalR.Connection("https://test");
      expect(connection.state === signalR.ConnectionState.Disconnected).toEqual(true)
    });
});