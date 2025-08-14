import * as grpc from "@grpc/grpc-js"
import { protoDescriptor } from "./grpcProtoDefinition.js";
import checkIsResourceAlive from "./handlers/checkIsResourceAlive.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../../../.env") });


const GRPC_PING_PORT: string = process.env.GRPC_PING_PORT || "0.0.0.0:50051";

const server = new grpc.Server();

server.addService((protoDescriptor as any).ping.PingService.service, {
    CheckIsResourceAlive: checkIsResourceAlive
})

export default function grpcServer() {
    server.bindAsync(GRPC_PING_PORT, grpc.ServerCredentials.createInsecure(), (err: any, port: any) => {
        if (err) {
            console.error("failed to start gRPC server", err);
            return;
        }
        console.log("gRPC server started on port", port);
    });
}


