const http = require('http')
const httpProxy = require('http-proxy');

const QUERY_SERVICE_HOST = 'http://query:4002';
const EVENT_SERVICE_HOST = 'http://event:4003';
const USER_SERVICE_HOST = 'http://user:4004';

const proxy = httpProxy.createProxyServer({});

const proxyServer = http.createServer((req, res) => {
  if (req.url === "/users") {
    proxy.web(req, res, { target: `${USER_SERVICE_HOST}` });
  }
});

console.log("Listening 3000");
proxyServer.listen(3000);