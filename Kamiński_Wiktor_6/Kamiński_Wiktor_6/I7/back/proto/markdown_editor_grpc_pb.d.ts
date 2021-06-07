// package: 
// file: markdown_editor.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as markdown_editor_pb from "./markdown_editor_pb";

interface IMarkdownEditorService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    listAllFiles: IMarkdownEditorService_IlistAllFiles;
    getFileContent: IMarkdownEditorService_IgetFileContent;
    saveFile: IMarkdownEditorService_IsaveFile;
    deleteFile: IMarkdownEditorService_IdeleteFile;
    createFile: IMarkdownEditorService_IcreateFile;
}

interface IMarkdownEditorService_IlistAllFiles extends grpc.MethodDefinition<markdown_editor_pb.ListFileRequest, markdown_editor_pb.FilesList> {
    path: string; // "/.MarkdownEditor/listAllFiles"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<markdown_editor_pb.ListFileRequest>;
    requestDeserialize: grpc.deserialize<markdown_editor_pb.ListFileRequest>;
    responseSerialize: grpc.serialize<markdown_editor_pb.FilesList>;
    responseDeserialize: grpc.deserialize<markdown_editor_pb.FilesList>;
}
interface IMarkdownEditorService_IgetFileContent extends grpc.MethodDefinition<markdown_editor_pb.FileNameRequest, markdown_editor_pb.FileContent> {
    path: string; // "/.MarkdownEditor/getFileContent"
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<markdown_editor_pb.FileNameRequest>;
    requestDeserialize: grpc.deserialize<markdown_editor_pb.FileNameRequest>;
    responseSerialize: grpc.serialize<markdown_editor_pb.FileContent>;
    responseDeserialize: grpc.deserialize<markdown_editor_pb.FileContent>;
}
interface IMarkdownEditorService_IsaveFile extends grpc.MethodDefinition<markdown_editor_pb.SaveFileRequest, markdown_editor_pb.OperationResult> {
    path: string; // "/.MarkdownEditor/saveFile"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<markdown_editor_pb.SaveFileRequest>;
    requestDeserialize: grpc.deserialize<markdown_editor_pb.SaveFileRequest>;
    responseSerialize: grpc.serialize<markdown_editor_pb.OperationResult>;
    responseDeserialize: grpc.deserialize<markdown_editor_pb.OperationResult>;
}
interface IMarkdownEditorService_IdeleteFile extends grpc.MethodDefinition<markdown_editor_pb.FileNameRequest, markdown_editor_pb.OperationResult> {
    path: string; // "/.MarkdownEditor/deleteFile"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<markdown_editor_pb.FileNameRequest>;
    requestDeserialize: grpc.deserialize<markdown_editor_pb.FileNameRequest>;
    responseSerialize: grpc.serialize<markdown_editor_pb.OperationResult>;
    responseDeserialize: grpc.deserialize<markdown_editor_pb.OperationResult>;
}
interface IMarkdownEditorService_IcreateFile extends grpc.MethodDefinition<markdown_editor_pb.FileNameRequest, markdown_editor_pb.OperationResult> {
    path: string; // "/.MarkdownEditor/createFile"
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<markdown_editor_pb.FileNameRequest>;
    requestDeserialize: grpc.deserialize<markdown_editor_pb.FileNameRequest>;
    responseSerialize: grpc.serialize<markdown_editor_pb.OperationResult>;
    responseDeserialize: grpc.deserialize<markdown_editor_pb.OperationResult>;
}

export const MarkdownEditorService: IMarkdownEditorService;

export interface IMarkdownEditorServer {
    listAllFiles: grpc.handleUnaryCall<markdown_editor_pb.ListFileRequest, markdown_editor_pb.FilesList>;
    getFileContent: grpc.handleServerStreamingCall<markdown_editor_pb.FileNameRequest, markdown_editor_pb.FileContent>;
    saveFile: grpc.handleUnaryCall<markdown_editor_pb.SaveFileRequest, markdown_editor_pb.OperationResult>;
    deleteFile: grpc.handleUnaryCall<markdown_editor_pb.FileNameRequest, markdown_editor_pb.OperationResult>;
    createFile: grpc.handleUnaryCall<markdown_editor_pb.FileNameRequest, markdown_editor_pb.OperationResult>;
}

export interface IMarkdownEditorClient {
    listAllFiles(request: markdown_editor_pb.ListFileRequest, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.FilesList) => void): grpc.ClientUnaryCall;
    listAllFiles(request: markdown_editor_pb.ListFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.FilesList) => void): grpc.ClientUnaryCall;
    listAllFiles(request: markdown_editor_pb.ListFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.FilesList) => void): grpc.ClientUnaryCall;
    getFileContent(request: markdown_editor_pb.FileNameRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<markdown_editor_pb.FileContent>;
    getFileContent(request: markdown_editor_pb.FileNameRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<markdown_editor_pb.FileContent>;
    saveFile(request: markdown_editor_pb.SaveFileRequest, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.OperationResult) => void): grpc.ClientUnaryCall;
    saveFile(request: markdown_editor_pb.SaveFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.OperationResult) => void): grpc.ClientUnaryCall;
    saveFile(request: markdown_editor_pb.SaveFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.OperationResult) => void): grpc.ClientUnaryCall;
    deleteFile(request: markdown_editor_pb.FileNameRequest, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.OperationResult) => void): grpc.ClientUnaryCall;
    deleteFile(request: markdown_editor_pb.FileNameRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.OperationResult) => void): grpc.ClientUnaryCall;
    deleteFile(request: markdown_editor_pb.FileNameRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.OperationResult) => void): grpc.ClientUnaryCall;
    createFile(request: markdown_editor_pb.FileNameRequest, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.OperationResult) => void): grpc.ClientUnaryCall;
    createFile(request: markdown_editor_pb.FileNameRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.OperationResult) => void): grpc.ClientUnaryCall;
    createFile(request: markdown_editor_pb.FileNameRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.OperationResult) => void): grpc.ClientUnaryCall;
}

export class MarkdownEditorClient extends grpc.Client implements IMarkdownEditorClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public listAllFiles(request: markdown_editor_pb.ListFileRequest, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.FilesList) => void): grpc.ClientUnaryCall;
    public listAllFiles(request: markdown_editor_pb.ListFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.FilesList) => void): grpc.ClientUnaryCall;
    public listAllFiles(request: markdown_editor_pb.ListFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.FilesList) => void): grpc.ClientUnaryCall;
    public getFileContent(request: markdown_editor_pb.FileNameRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<markdown_editor_pb.FileContent>;
    public getFileContent(request: markdown_editor_pb.FileNameRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<markdown_editor_pb.FileContent>;
    public saveFile(request: markdown_editor_pb.SaveFileRequest, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.OperationResult) => void): grpc.ClientUnaryCall;
    public saveFile(request: markdown_editor_pb.SaveFileRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.OperationResult) => void): grpc.ClientUnaryCall;
    public saveFile(request: markdown_editor_pb.SaveFileRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.OperationResult) => void): grpc.ClientUnaryCall;
    public deleteFile(request: markdown_editor_pb.FileNameRequest, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.OperationResult) => void): grpc.ClientUnaryCall;
    public deleteFile(request: markdown_editor_pb.FileNameRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.OperationResult) => void): grpc.ClientUnaryCall;
    public deleteFile(request: markdown_editor_pb.FileNameRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.OperationResult) => void): grpc.ClientUnaryCall;
    public createFile(request: markdown_editor_pb.FileNameRequest, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.OperationResult) => void): grpc.ClientUnaryCall;
    public createFile(request: markdown_editor_pb.FileNameRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.OperationResult) => void): grpc.ClientUnaryCall;
    public createFile(request: markdown_editor_pb.FileNameRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: markdown_editor_pb.OperationResult) => void): grpc.ClientUnaryCall;
}
