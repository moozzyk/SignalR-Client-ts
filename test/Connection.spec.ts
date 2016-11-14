/// <reference path="../typings/index.d.ts" />
/// <reference path="../artifacts/lib/SignalR.d.ts" />

describe('Connection', function() {
    it('is created in disconnected state', function() {
      var connection = new SignalR.Connection("https://test");
      expect(connection.state === SignalR.ConnectionState.Disconnected).toEqual(true)
    });
});