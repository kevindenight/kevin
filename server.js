import {server} from './server/express';

server.listen(3000, () => {

    console.info('Listening on %d', server.address().port);

});