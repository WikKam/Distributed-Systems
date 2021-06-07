import { Server, ServerCredentials } from "grpc";
import { MarkdownEditorService } from "./proto/markdown_editor_grpc_pb";
import { MarkdownEditorServer } from "./src/MarkdownEditorServer";

const server = new Server();
server.addService(MarkdownEditorService, new MarkdownEditorServer());

const port = 50051;
const uri = `localhost:${port}`;
console.log(`Listening on ${uri}`);
server.bind(uri, ServerCredentials.createInsecure());

server.start();