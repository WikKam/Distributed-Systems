// package: 
// file: src/proto/markdown_editor.proto

import * as jspb from "google-protobuf";

export class ListFileRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ListFileRequest): ListFileRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListFileRequest;
  static deserializeBinaryFromReader(message: ListFileRequest, reader: jspb.BinaryReader): ListFileRequest;
}

export namespace ListFileRequest {
  export type AsObject = {
  }
}

export class FileNameRequest extends jspb.Message {
  getFilename(): string;
  setFilename(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileNameRequest.AsObject;
  static toObject(includeInstance: boolean, msg: FileNameRequest): FileNameRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FileNameRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileNameRequest;
  static deserializeBinaryFromReader(message: FileNameRequest, reader: jspb.BinaryReader): FileNameRequest;
}

export namespace FileNameRequest {
  export type AsObject = {
    filename: string,
  }
}

export class FilesList extends jspb.Message {
  clearNameList(): void;
  getNameList(): Array<string>;
  setNameList(value: Array<string>): void;
  addName(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FilesList.AsObject;
  static toObject(includeInstance: boolean, msg: FilesList): FilesList.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FilesList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FilesList;
  static deserializeBinaryFromReader(message: FilesList, reader: jspb.BinaryReader): FilesList;
}

export namespace FilesList {
  export type AsObject = {
    nameList: Array<string>,
  }
}

export class FileContent extends jspb.Message {
  getContent(): string;
  setContent(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileContent.AsObject;
  static toObject(includeInstance: boolean, msg: FileContent): FileContent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FileContent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileContent;
  static deserializeBinaryFromReader(message: FileContent, reader: jspb.BinaryReader): FileContent;
}

export namespace FileContent {
  export type AsObject = {
    content: string,
  }
}

export class OperationResult extends jspb.Message {
  getSuccessful(): boolean;
  setSuccessful(value: boolean): void;

  getErrormsg(): string;
  setErrormsg(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OperationResult.AsObject;
  static toObject(includeInstance: boolean, msg: OperationResult): OperationResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: OperationResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OperationResult;
  static deserializeBinaryFromReader(message: OperationResult, reader: jspb.BinaryReader): OperationResult;
}

export namespace OperationResult {
  export type AsObject = {
    successful: boolean,
    errormsg: string,
  }
}

export class SaveFileRequest extends jspb.Message {
  hasContent(): boolean;
  clearContent(): void;
  getContent(): FileContent | undefined;
  setContent(value?: FileContent): void;

  getFilename(): string;
  setFilename(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SaveFileRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SaveFileRequest): SaveFileRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SaveFileRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SaveFileRequest;
  static deserializeBinaryFromReader(message: SaveFileRequest, reader: jspb.BinaryReader): SaveFileRequest;
}

export namespace SaveFileRequest {
  export type AsObject = {
    content?: FileContent.AsObject,
    filename: string,
  }
}

