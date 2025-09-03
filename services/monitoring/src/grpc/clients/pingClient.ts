import grpcMonitoringClient from "../server/grpcProtoDefinition.js";

class PingClient {

  async monitoringService(): Promise<void> {
    return new Promise((resolve, reject) => {
      grpcMonitoringClient.MonitorResources({}, (error: any, grpcResponse: any) => {
        if (error) return reject(error);
        resolve(grpcResponse);
      });
    })
  }

}

export default new PingClient();