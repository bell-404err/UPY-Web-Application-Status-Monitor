import { Task } from "../scheduler/Scheduler.types.js";

class Worker {

  queue: Task[];
  limit: number;
  chunk: Task[];

  constructor() {
    this.queue = [];
    this.limit = 50;
    this.chunk = []
  }

  async makeChunk(dueTasks: Task[]) {

  }

  async startQueue() {
    const queue: Task[] = await this.makeChunk();
  }

  async process(task: Task[]) {

  }

}

export default Worker;