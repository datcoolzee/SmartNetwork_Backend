import express from 'express';

/*import all routes that will be used here*/
import heatmapRouter from './HeatmapsRoute';
import addressesRouter from './AddressesRoute';
import routersRouter from './RoutersRoute';
import pindropsRouter from './PindropsRoute'
import connectionStatsRouter from './connectionStatsRoute';

/*make main router for v1 api*/
var smartrg_V1_Router = express.Router();

var welcomeMessage = { message: 'Welcome to SmartNet' };

smartrg_V1_Router.get('/', function(req, res, next){
	res.json(welcomeMessage);
});

smartrg_V1_Router.use('/heatmaps', heatmapRouter);
smartrg_V1_Router.use('/addresses', addressesRouter);
smartrg_V1_Router.use('/routers', routersRouter);
smartrg_V1_Router.use('/pindrops', pindropsRouter);
smartrg_V1_Router.use('/connection-statistics', connectionStatsRouter);
	
export default smartrg_V1_Router