// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var markdown_editor_pb = require('./markdown_editor_pb.js');

function serialize_FileContent(arg) {
  if (!(arg instanceof markdown_editor_pb.FileContent)) {
    throw new Error('Expected argument of type FileContent');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_FileContent(buffer_arg) {
  return markdown_editor_pb.FileContent.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_FileNameRequest(arg) {
  if (!(arg instanceof markdown_editor_pb.FileNameRequest)) {
    throw new Error('Expected argument of type FileNameRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_FileNameRequest(buffer_arg) {
  return markdown_editor_pb.FileNameRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_FilesList(arg) {
  if (!(arg instanceof markdown_editor_pb.FilesList)) {
    throw new Error('Expected argument of type FilesList');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_FilesList(buffer_arg) {
  return markdown_editor_pb.FilesList.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ListFileRequest(arg) {
  if (!(arg instanceof markdown_editor_pb.ListFileRequest)) {
    throw new Error('Expected argument of type ListFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ListFileRequest(buffer_arg) {
  return markdown_editor_pb.ListFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_OperationResult(arg) {
  if (!(arg instanceof markdown_editor_pb.OperationResult)) {
    throw new Error('Expected argument of type OperationResult');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_OperationResult(buffer_arg) {
  return markdown_editor_pb.OperationResult.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_SaveFileRequest(arg) {
  if (!(arg instanceof markdown_editor_pb.SaveFileRequest)) {
    throw new Error('Expected argument of type SaveFileRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SaveFileRequest(buffer_arg) {
  return markdown_editor_pb.SaveFileRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var MarkdownEditorService = exports.MarkdownEditorService = {
  listAllFiles: {
    path: '/MarkdownEditor/listAllFiles',
    requestStream: false,
    responseStream: false,
    requestType: markdown_editor_pb.ListFileRequest,
    responseType: markdown_editor_pb.FilesList,
    requestSerialize: serialize_ListFileRequest,
    requestDeserialize: deserialize_ListFileRequest,
    responseSerialize: serialize_FilesList,
    responseDeserialize: deserialize_FilesList,
  },
  getFileContent: {
    path: '/MarkdownEditor/getFileContent',
    requestStream: false,
    responseStream: true,
    requestType: markdown_editor_pb.FileNameRequest,
    responseType: markdown_editor_pb.FileContent,
    requestSerialize: serialize_FileNameRequest,
    requestDeserialize: deserialize_FileNameRequest,
    responseSerialize: serialize_FileContent,
    responseDeserialize: deserialize_FileContent,
  },
  saveFile: {
    path: '/MarkdownEditor/saveFile',
    requestStream: false,
    responseStream: false,
    requestType: markdown_editor_pb.SaveFileRequest,
    responseType: markdown_editor_pb.OperationResult,
    requestSerialize: serialize_SaveFileRequest,
    requestDeserialize: deserialize_SaveFileRequest,
    responseSerialize: serialize_OperationResult,
    responseDeserialize: deserialize_OperationResult,
  },
  deleteFile: {
    path: '/MarkdownEditor/deleteFile',
    requestStream: false,
    responseStream: false,
    requestType: markdown_editor_pb.FileNameRequest,
    responseType: markdown_editor_pb.OperationResult,
    requestSerialize: serialize_FileNameRequest,
    requestDeserialize: deserialize_FileNameRequest,
    responseSerialize: serialize_OperationResult,
    responseDeserialize: deserialize_OperationResult,
  },
  createFile: {
    path: '/MarkdownEditor/createFile',
    requestStream: false,
    responseStream: false,
    requestType: markdown_editor_pb.FileNameRequest,
    responseType: markdown_editor_pb.OperationResult,
    requestSerialize: serialize_FileNameRequest,
    requestDeserialize: deserialize_FileNameRequest,
    responseSerialize: serialize_OperationResult,
    responseDeserialize: deserialize_OperationResult,
  },
};

exports.MarkdownEditorClient = grpc.makeGenericClientConstructor(MarkdownEditorService);
