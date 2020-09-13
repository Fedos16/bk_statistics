export default function (server, dir_path) {
    let io = require('socket.io').listen(server);
    io.sockets.on('connection', (socket) => {
        console.log('Пользователь подключен');

        socket.on('disconnect', () => {
            console.log('Пользователь отключился');
          });

        socket.emit('open_connect', {text: 'Соединение с сервером установлено'});

    });
}