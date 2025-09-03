import { Task } from "../scheduler/Scheduler.types.js";
import PingClient from "../../grpc/clients/pingClient.js";

class Worker {

  queue: Task[][];
  limit: number;
  // grpc: PingClient;

  constructor() {
    this.queue = [];
    this.limit = 50;
    // this.grpc = new PingClient();
  }

  makeChunk(tasks: Task[]): Task[][] {
    const chunks = [];

    for (let i = 0; i < tasks.length; i += this.limit) {
      const chunk = tasks.slice( i, i + this.limit );
      chunks.push( chunk );
    }
    return chunks;
  }

  async startQueue(tasks: Task[]): Promise<void> {

    this.queue = this.makeChunk(tasks);

    for (const chunk of this.queue) {
      // const res = await this.grpc.monitoringService()
      const res = await PingClient.monitoringService()
      console.log(res)
    }
    // await Promise.all(this.queue.map(chunk => grpcPingClient.ping(chunk)));


  }
}
export default Worker;