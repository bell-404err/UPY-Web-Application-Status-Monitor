import userServiceClient from './modules/userServiceClient/userServiceClient.js';

const userId: string = "1234"
const url: string = 'https://jsonurl.org/'


class MonitoringService {
    userId: string;
    url: string;
    constructor(url: string, userId: string) {
        this.url = url
        this.userId = userId
    }

    async getUserInfo () {
        console.log('grpc call user info')
        return {
            limit: 5
        }
    }

    async updateRepository() {

    }

    async deleteRepository () {}
    async callScheduler () {}
    async callWorkerPool() {}
    async callPingMS () {
        console.log('grpc call ping')
    }

    async process() {
        try {
            const user: object = await this.getUserInfo()
            if (!user) {
                return null
            }
            if (user.limit < this.getUrlCount()) {
                return null
            }
            await this.updateRepository(this.url)
            const inMemoryURLBase = await this.callScheduler()
            if (inMemoryURLBase) {
                await this.callWorkerPool()
            }

        } catch(err) {
            console.error('Monitoring error:', err)
            throw err
        }
    }
}