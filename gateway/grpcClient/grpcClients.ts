import grpcPingClient from "./grpcPingClient.js"

export default class GrpcClients {

    async ping(url: string) {
        return new Promise((resolve, reject) => {
            grpcPingClient.CheckIsResourceAlive({url}, (error: any, grpcResponse: any) => {
                if (error) return reject(error);
                resolve(grpcResponse);
            })
        })
    }

}