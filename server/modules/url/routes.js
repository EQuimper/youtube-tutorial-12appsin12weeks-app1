import { Router } from 'express';
import * as Url from './controller';

const urlRoute = new Router();

urlRoute.route('/api/v1/shorten').post(Url.createShort);

export default urlRoute;
