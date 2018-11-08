import {server} from './server/express';
import Domain from './config/domain.json';

server.listen(Domain.ServerPort, () => {

    console.info('Listening on %d', server.address().port);

});