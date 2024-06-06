const http = require('http');

// Написать обработчик запроса:
// - Ответом на запрос `?hello=<name>` должна быть **строка** "Hello, <name>.", код ответа 200
// - Если параметр `hello` указан, но не передано `<name>`, то ответ **строка** "Enter a name", код ответа 400
// - Ответом на запрос `?users` должен быть **JSON** с содержимым файла `data/users.json`, код ответа 200
// - Если никакие параметры не переданы, то ответ **строка** "Hello, World!", код ответа 200
// - Если переданы какие-либо другие параметры, то пустой ответ, код ответа 500


const getUsers = require('./modules/users');

const hostname = '127.0.0.1';
const port = 3003;

const server = http.createServer((request, response) => {
    const ipAddress = "http://127.0.0.1";
    const url = new URL(request.url, ipAddress);
    const userName = url.searchParams.get('hello');

    if (userName) {
        response.statusCode = 200;
        response.statusMessage = "OK"
        response.header = "Content-Type: text/plain"
        response.write(`Hello, ${userName}.`);
        response.end();
        return;
    } else if (request.url === '/?hello') {
        response.statusCode = 400;
        response.statusMessage = "OK"
        response.header = "Content-Type: text/plain"
        response.write('Enter a name');
        response.end();
        return;
    } else if (request.url === '/?users') {
        response.statusCode = 200;
        response.statusMessage = "OK"
        response.header = "Content-Type: application/json"
        response.write(getUsers());
        response.end();
        return;
    } else if (request.url === "/") {
        response.statusCode = 200;
        response.statusMessage = "OK"
        response.header = "Content-Type: text/plain"
        response.write("Hello, word!");
        response.end()
        return;
    } else {
        response.statusCode = 500;
        response.statusMessage = "ERROR";
        response.header = "Content-Type: text/html; charset=utf-8";
        response.write("Ошибка");
        response.end();
        return;
    }
})

server.listen(port, hostname, () => {
    console.log(`Сервер запущен по адресу http://${hostname}:${port}/`)
});