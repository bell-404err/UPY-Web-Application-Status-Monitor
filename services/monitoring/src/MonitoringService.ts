import { MonitoringDB } from './db/db.js';

const userId: string = "1234"
const url: string = 'https://jsonurl.org/'

interface UrlItem {
  _id?: string;
  url: string;
  interval: number;
  isActive: boolean;
}

interface Resource {
  userId: string;
  urlData: UrlItem;
}

interface AddResourceResult {
  success: boolean;
  message: string;
  data?: Resource;
}

class MonitoringService {

  async addResource(data: Resource): Promise<AddResourceResult> {
    try {
      const { userId, urlData } = data;
      const user = await MonitoringDB.findOne({ userId });

      if (!user) {
        await MonitoringDB.create({
          userId,
          urls: [urlData],
        })
        return { success: true, message: "Resource created successfully.", data: data };
      }

      const urlDuplicate = user.urls.some(item => item.url === urlData.url);
      if (urlDuplicate) {
        return { success: false, message: "Resource already exists!", data: data };
      }

      if (user.urls?.length >= 1) {
        return { success: false, message: "Limit exceeded.", data: data };
      }

      await MonitoringDB.updateOne({ userId }, {
        $push: { urls: urlData }
      });
      return { success: true, message: "Resource created successfully.", data: data };

    } catch (error) {
      throw new Error(`Unexpected state in addResource()`, { cause: error as Error });
    }
  }

  async updateResource(data: Resource) {
    try {
      const { userId, urlData } = data;

      const user = await MonitoringDB.findOne({ userId });
      if (!user) {
        return { success: false, message: `User: ${userId} not found!`, data: data };
      }

      if (!urlData._id) {
        return { success: false, message: "Resource does not exists!", data: data };
      }

      const updatedUrl = await MonitoringDB.findOneAndUpdate(
        { userId, "urls._id": urlData._id },
        {
          $set: {
            "urls.$.url": urlData.url,
            "urls.$.interval": urlData.interval,
            "urls.$.isActive": urlData.isActive,
          }
        },
        { new: true }
      )
      return { success: true, message: "Resource updated successfully.", data: updatedUrl };

    } catch (error) {
      throw new Error(`Unexpected state in updateResource()`, { cause: error as Error });
    }
  }

  async deleteResource(data: Resource) {
    try {
      const { userId, urlData } = data;

      const user = await MonitoringDB.findOne({ userId });
      if (!user) {
        return { success: false, message: `User: ${userId} not found!`, data: data };
      }

      const deletedUrl = await MonitoringDB.findOneAndUpdate(
        { userId, "urls._id": urlData._id },
        {
          $pull: {
            "urls": { _id: urlData._id}
          }
        }
      );
      return { success: true, message: "Resource deleted successfully.", data: deletedUrl };

    } catch (error) {
      throw new Error(`Unexpected state in deleteResource()`, { cause: error as Error });
    }
  }

  async start() {
    // Run workers and scheduler

    // try {
    //   const user: object = await this.getUserInfo()
    //   if (!user) {
    //     return null
    //   }
    //   if (user.limit < this.getUrlCount()) {
    //     return null
    //   }
    //   await this.updateRepository(this.url)
    //   const inMemoryURLBase = await this.callScheduler()
    //   if (inMemoryURLBase) {
    //     await this.callWorkerPool()
    //   }
    //
    // } catch (err) {
    //   console.error('Monitoring error:', err)
    //   throw err
    // }
  }
}

export default MonitoringService;
