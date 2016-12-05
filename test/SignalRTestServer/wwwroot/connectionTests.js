describe('connection', () => {
    it('can connect', done => {
        let connection = new signalR.Connection('/signalr/raw-connection');
        connection.start()
        .then(() => {
            expect(connection.state).toBe(signalR.ConnectionState.Connected);
        })
        .then(() => {
            connection.stop();
            expect(connection.state).toBe(signalR.ConnectionState.Disconnected);
            done();
        })
        .catch(e => {
            expect(true).toBe(false);
            done();
        });
    });

    it('can send receive data', done => {
        let connection = new signalR.Connection('/signalr/raw-connection');
        connection.start()
        .then(() => {
            expect(connection.state).toBe(signalR.ConnectionState.Connected);
            connection.send("Hello World!");
        })
        .then(() => {
            connection.stop();
            expect(connection.state).toBe(signalR.ConnectionState.Disconnected);
            done();
        })
        .catch(e => {
            expect(true).toBe(false);
            done();
        });
    });
});