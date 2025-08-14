import * as grpc from "@grpc/grpc-js"
import { protoDescriptor } from "./grpcProtoDefinition.js";
import path from "path"
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const server = new grpc.Server();

// server.addService(protoDescriptor.ping.PingService.service, {
//     // CheckIsResourceAlive: checkIsResourceAlive
// })