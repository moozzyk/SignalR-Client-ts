function fail() {
    expect(true).toBe(false);
}

describe('connection', () => {
    it('can connect', done => {
        let connection = new signalR.Connection('/raw-connection');
        connection.start()
        .then(() => {
            expect(connection.state).toBe(signalR.ConnectionState.Connected);
            connection.stop();
            expect(connection.state).toBe(signalR.ConnectionState.Disconnected);
            done();
        })
        .catch(e => {
            fail();
            done();
        });
    });

    it('can send receive data', done => {
        let connection = new signalR.Connection('/raw-connection');
        const message = "Hello, World!";

        connection.messageReceived = m => {
            expect(m).toEqual(message);
            connection.stop();
            done();
        };

        connection.start()
        .then(() => {
            connection.send(message);
            setTimeout(() => {
                if (connection.state == signalR.ConnectionState.Connected) {
                    connection.stop();
                    fail();
                    done();
                }
            }, 2000);
        })
        .catch(e => {
            fail();
            done();
        });
    });
});