import * as grpc from "@grpc/grpc-js";
import { monitoringDescriptor } from '../../descriptors/monitoring.js';
import { Slot } from "./MonitoringGrpcClient.types.js";


const monitoringClient = new monitoringDescriptor.monitoring.MonitoringService("monitoring:50052", grpc.credentials.createInsecure());

// TODO: if Slot slot = 1; -> grpc wait object, not just variables. Update methods
// TODO: Define what exactly each method wait as a data: what type of data will accept, and what type of data will returns
class MonitoringGrpcClient {

  async getSlot(userId: any, urlId: any) {
    return new Promise<Slot>((resolve, reject) => {
      monitoringClient.GetSlot({ userId, urlId }, (err, grpcResponse) => {
        if (err) return reject(err);
        resolve(grpcResponse);
      })
    })
  }

  async listSlots(userId) {
    return new Promise<Slot[]>((resolve, reject) => {
      monitoringClient.GetSlots({ userId }, (err, grpcResponse) => {
        if (err) return reject(err);
        resolve(grpcResponse);
      })
    })
  }

  async createSlot(userId, url, interval, isActive) {
    return new Promise<Slot>((resolve, reject) => {
      monitoringClient.CreateSlot({ userId, url, interval, isActive }, (err, grpcResponse) => {
        if (err) return reject(err);
        resolve(grpcResponse);
      })
    })
  }

  async updateSlot(userId, urlId, url, interval, isActive) {
    return new Promise<Slot>((resolve, reject) => {
      monitoringClient.UpdateSlot({ userId, urlId, url, interval, isActive }, (err, grpcResponse) => {
        if (err) return reject(err);
        resolve(grpcResponse);
      })
    })
  }

  async deleteSlot(userId, urlId) {
    return new Promise<Slot>((resolve, reject) => {
      monitoringClient.DeleteSlot({ userId, urlId }, (err, grpcResponse) => {
        if (err) return reject(err);
        resolve(grpcResponse);
      })
    })
  }

}

export default new MonitoringGrpcClient();