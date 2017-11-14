import express from 'express';

/*import all routes that will be used here*/
import heatmapRouter from './HeatmapsRoute';
import addressesRouter from './AddressesRoute';
import routersRouter from './RoutersRoute';
import pindropsRouter from './PindropsRoute'
import connectionStatsRouter from './connectionStatsRoute';
import paths from '../paths';

/*make main router for v1 api*/
var smartrg_V1_Router = express.Router();

var welcomeMessage = { message: 'Welcome to SmartNet' };

smartrg_V1_Router.get('/', function(req, res, next){
	res.json(welcomeMessage);
});

smartrg_V1_Router.use(paths.heatmaps, heatmapRouter);
smartrg_V1_Router.use(paths.addresses, addressesRouter);
smartrg_V1_Router.use(paths.routers, routersRouter);
smartrg_V1_Router.use(paths.pindrops, pindropsRouter);
smartrg_V1_Router.use(paths.connection_statistics, connectionStatsRouter);
	
export default smartrg_V1_Router