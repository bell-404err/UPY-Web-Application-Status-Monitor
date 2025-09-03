import * as grpc from "@grpc/grpc-js"
import * as protoLoader from "@grpc/proto-loader"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );


const PROTO_PATH: string = path.resolve( __dirname, "../../../proto/monitoring.proto" );

const packageDefinition = protoLoader.loadSync(
  PROTO_PATH,
  {
    enums: String,
    defaults: true,
  }
);

export const protoDescriptor = grpc.loadPackageDefinition( packageDefinition );



// const grpcMonitoringClient = new (protoDescriptor as any).monitoring.MonitoringService( "ping:50051", grpc.credentials.createInsecure() )
//
// export default grpcMonitoringClient;
