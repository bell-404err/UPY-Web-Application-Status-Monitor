import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader";
import path from "path"
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PROTO_PATH = path.resolve(__dirname, "../../proto/ping.proto");

const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        enums: String,
        defaults: true,
    }
);

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

const grpcPingClient = new protoDescriptor.ping.PingService("ping:50051", grpc.credentials.createInsecure())
export default grpcPingClient;



