import MonitoringGrpcClient from "../../grpc/clients/monitoring/MonitoringGrpcClient.js"


// real logic -> grpc call in my case
//TODO: Define data type for each method, crete types of data, and types of returns
//TODO: Define each throw
class MonitoringService {

  async getResource(userId: any, urlId: any) {
    try {

    } catch (e) {
          throw new Error(`Something went wrong ${(e as Error).message}`)
    }
  }
  async listResources(userId: any, urlId: any) {
    try {

    } catch (e) {
      throw new Error(`Something went wrong ${e as Error}, ${e.message}`)
    }
  }
  async addResource(userId: any, urlId: any) {
        try {

    } catch (e) {
      throw new Error(`Something went wrong ${e as Error}, ${e.message}`)
    }
  }
  async updateResource(userId: any, urlId: any) {
        try {

    } catch (e) {
      throw new Error(`Something went wrong ${e as Error}, ${e.message}`)
    }
  }
  async deleteResource(userId: any, urlId: any) {
        try {

    } catch (e) {
      throw new Error(`Something went wrong ${e as Error}, ${e.message}`)
    }
  }

}

export default new MonitoringService();