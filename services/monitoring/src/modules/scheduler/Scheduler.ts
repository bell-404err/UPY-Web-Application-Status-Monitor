// import monitorTasks from "../../../testData.js";
import { Monitoring } from "../../db/db.js";
import { Task } from "./Scheduler.types.js"
import Worker from "../Worker/Worker.js"

class Scheduler {

  tasks: Task[];
  worker: Worker;

  constructor() {
    this.tasks = [];
    this.worker = new Worker();
  }

  async process(): Promise<void> {
    await this.syncWithDB();
    setInterval(() => this.dueTask(), 1000)
    setInterval(() => this.syncWithDB(), 30000)
  }

  async syncWithDB(): Promise<Task[]> {

    try {
      const dbTasks: Task[] = await Monitoring.aggregate([
        { $unwind: "$urls" },
        { $match: { "urls.isActive": true } },
        {
          $project: {
            _id: 0,
            userId: 1,
            url: "$urls.url",
            interval: "$urls.interval",
            isActive: "$urls.isActive"
          }
        }
      ])

      this.tasks = this.tasks.filter(task =>
        dbTasks.some((dbTask: Task) => {
          return dbTask.userId === task.userId && dbTask.url === task.url;
        })
      )

      for (const task of dbTasks) {
        const existingTask: Task | undefined = this.tasks.find(item => item.userId === task.userId && item.url === task.url);

        if (!existingTask) {
          this.tasks.push({ ...task, nextCheckAt: Date.now() + task.interval * 1000 })

        } else {
          if (existingTask.interval !== task.interval) {
            existingTask.interval = task.interval;
            existingTask.nextCheckAt = Date.now() + task.interval * 1000;
          }
          existingTask.isActive = task.isActive;
        }
      }

    } catch (error) {
      throw error;
    }
    return this.tasks;
  }

  async dueTask(): Promise<void> {

    const presentTime = Date.now();

    const dueTasks: Task[] = this.tasks.filter((task: Task) => {
      return task.nextCheckAt <= presentTime;
    })

    if (!dueTasks.length) return;

    for (const task of this.tasks) {
      task.nextCheckAt = presentTime + task.interval * 1000;
    }

    await this.worker.startQueue(dueTasks);

  }
}

export default Scheduler;
