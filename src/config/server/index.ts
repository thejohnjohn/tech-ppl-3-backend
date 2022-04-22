import * as http from 'http';
import server from './server';

const Server: http.Server = http.createServer(server);

Server.listen(server.get('port'));
