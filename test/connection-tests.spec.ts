/// <reference path="../typings/index.d.ts" />

describe('connection tests', () => {
  it('connection is created in disconnected state', function() {
    var connection = new signalR.connection();
    expect(connection.state === signalR.connectionState.disconnected).toEqual(true) });
});