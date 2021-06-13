// package: 
// file: src/proto/markdown_editor.proto

import * as src_proto_markdown_editor_pb from "../../src/proto/markdown_editor_pb";
import {grpc} from "@improbable-eng/grpc-web";

type MarkdownEditorlistAllFiles = {
  readonly methodName: string;
  readonly service: typeof MarkdownEditor;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof src_proto_markdown_editor_pb.ListFileRequest;
  readonly responseType: typeof src_proto_markdown_editor_pb.FilesList;
};

type MarkdownEditorgetFileContent = {
  readonly methodName: string;
  readonly service: typeof MarkdownEditor;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof src_proto_markdown_editor_pb.FileNameRequest;
  readonly responseType: typeof src_proto_markdown_editor_pb.FileContent;
};

type MarkdownEditorsaveFile = {
  readonly methodName: string;
  readonly service: typeof MarkdownEditor;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof src_proto_markdown_editor_pb.SaveFileRequest;
  readonly responseType: typeof src_proto_markdown_editor_pb.OperationResult;
};

type MarkdownEditordeleteFile = {
  readonly methodName: string;
  readonly service: typeof MarkdownEditor;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof src_proto_markdown_editor_pb.FileNameRequest;
  readonly responseType: typeof src_proto_markdown_editor_pb.OperationResult;
};

type MarkdownEditorcreateFile = {
  readonly methodName: string;
  readonly service: typeof MarkdownEditor;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof src_proto_markdown_editor_pb.FileNameRequest;
  readonly responseType: typeof src_proto_markdown_editor_pb.OperationResult;
};

export class MarkdownEditor {
  static readonly serviceName: string;
  static readonly listAllFiles: MarkdownEditorlistAllFiles;
  static readonly getFileContent: MarkdownEditorgetFileContent;
  static readonly saveFile: MarkdownEditorsaveFile;
  static readonly deleteFile: MarkdownEditordeleteFile;
  static readonly createFile: MarkdownEditorcreateFile;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class MarkdownEditorClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  listAllFiles(
    requestMessage: src_proto_markdown_editor_pb.ListFileRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: src_proto_markdown_editor_pb.FilesList|null) => void
  ): UnaryResponse;
  listAllFiles(
    requestMessage: src_proto_markdown_editor_pb.ListFileRequest,
    callback: (error: ServiceError|null, responseMessage: src_proto_markdown_editor_pb.FilesList|null) => void
  ): UnaryResponse;
  getFileContent(requestMessage: src_proto_markdown_editor_pb.FileNameRequest, metadata?: grpc.Metadata): ResponseStream<src_proto_markdown_editor_pb.FileContent>;
  saveFile(
    requestMessage: src_proto_markdown_editor_pb.SaveFileRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: src_proto_markdown_editor_pb.OperationResult|null) => void
  ): UnaryResponse;
  saveFile(
    requestMessage: src_proto_markdown_editor_pb.SaveFileRequest,
    callback: (error: ServiceError|null, responseMessage: src_proto_markdown_editor_pb.OperationResult|null) => void
  ): UnaryResponse;
  deleteFile(
    requestMessage: src_proto_markdown_editor_pb.FileNameRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: src_proto_markdown_editor_pb.OperationResult|null) => void
  ): UnaryResponse;
  deleteFile(
    requestMessage: src_proto_markdown_editor_pb.FileNameRequest,
    callback: (error: ServiceError|null, responseMessage: src_proto_markdown_editor_pb.OperationResult|null) => void
  ): UnaryResponse;
  createFile(
    requestMessage: src_proto_markdown_editor_pb.FileNameRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: src_proto_markdown_editor_pb.OperationResult|null) => void
  ): UnaryResponse;
  createFile(
    requestMessage: src_proto_markdown_editor_pb.FileNameRequest,
    callback: (error: ServiceError|null, responseMessage: src_proto_markdown_editor_pb.OperationResult|null) => void
  ): UnaryResponse;
}

