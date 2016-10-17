/// <reference path="../typings/index.d.ts" />
/// <reference path="../artifacts/lib/SignalR.d.ts" />
describe('connection tests', () => {
    it('connection is created in disconnected state', function () {
        var connection = new SignalR.Connection();
        expect(connection.state === SignalR.ConnectionState.Disconnected).toEqual(true);
    });
});
