import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import NetworkRouter from './routes/network';
import IndexRouter from './routes';
import cors from 'cors';

let server = express();

server.use(cors());
server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cookieParser());

server.use('/', IndexRouter);
server.use('/api/network', NetworkRouter);

module.exports = server;
