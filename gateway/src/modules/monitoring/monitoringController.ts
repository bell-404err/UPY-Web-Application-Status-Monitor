import { Request, Response } from 'express';
import MonitoringService from './monitoringService.js';

interface getMonitoredUrl {

}

//only for http logic -> monitoring service calls, return answers to a client
//TODO: Create catch block with specific http code and clear message
//TODO: It's REST-ful methods, something comes from params, something from body
class MonitoringController {

  async getMonitoredUrl(req: Request, res: Response) {
    try {

    } catch (e) {

    }
  }

  async listMonitoredUrls(req: Request, res: Response) {
    try {

    } catch (e) {

    }
  }

  async createMonitoredUrl(req: Request, res: Response) {
    try {

    } catch (e) {

    }
  }

  async updateMonitoredUrl(req: Request, res: Response) {
    try {

    } catch (e) {

    }
  }

  async deleteMonitoredUrl(req: Request, res: Response) {
    try {

    } catch (e) {

    }
  }
}

export default new MonitoringController();

