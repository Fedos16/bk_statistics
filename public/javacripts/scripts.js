$(async function(){

    var sok = io.connect();
    sok
    .on('open_connect', (msg) => {
        setStatus(msg.text, 'green');
    })
    .on('connect', () => {
        setStatus('Соединение с сервером установлено', 'green');
    })
    .on('disconnect', () => {
        setStatus('Соединение с серверов разорвано', 'red');
    })
    .on('reconnect_failed', () => {
        setStatus('Ошибка повторного соединения', 'red');
    })
    .on('transfer_data', (data) => {
        setStatus(data.text, 'green');
        console.log(data);
    });

});