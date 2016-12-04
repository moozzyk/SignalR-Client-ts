describe('connection', () => {
    it('can connect', done => {
        let connection = new signalR.Connection('/signalr/raw-connection');
        connection.start()
        .then(() => {
            expect(connection.state).toBe(signalR.ConnectionState.Connected);
            // TODO: connection.stop();
            done();
        })
        .catch(e => {
            expect(true).toBe(false);
            done();
        });
    });
});