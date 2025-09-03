import MonitoringService from './MonitoringService.js';

const testResource = {
  userId: "1333",
  urlData: {
      url: "http://192.168.0.100/",
      interval: 60,
      isActive: true,
  }
}

const monitor = new MonitoringService();

const res = await monitor.addResource(testResource);
console.log(res)

