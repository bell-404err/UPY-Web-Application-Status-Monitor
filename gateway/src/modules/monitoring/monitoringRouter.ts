import express from 'express';
import MonitoringController from './monitoringController.js';
import checkAuthTokenMiddleware from './checkAuthTokenMiddleware.js';

const monitoringRouter = express.Router();

//only express logic: routes and middlewares
monitoringRouter.get('/monitoring/:urlId', checkAuthTokenMiddleware, MonitoringController.getMonitoredUrl);
monitoringRouter.get('/monitoring/', checkAuthTokenMiddleware, MonitoringController.listMonitoredUrls);
monitoringRouter.post('/monitoring', checkAuthTokenMiddleware, MonitoringController.createMonitoredUrl);
monitoringRouter.patch('/monitoring/:urlId', checkAuthTokenMiddleware, MonitoringController.updateMonitoredUrl);
monitoringRouter.delete('/monitoring/:urlId', checkAuthTokenMiddleware, MonitoringController.deleteMonitoredUrl);

export default monitoringRouter;
