// package: 
// file: src/proto/markdown_editor.proto

var src_proto_markdown_editor_pb = require("../../src/proto/markdown_editor_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var MarkdownEditor = (function () {
  function MarkdownEditor() {}
  MarkdownEditor.serviceName = "MarkdownEditor";
  return MarkdownEditor;
}());

MarkdownEditor.listAllFiles = {
  methodName: "listAllFiles",
  service: MarkdownEditor,
  requestStream: false,
  responseStream: false,
  requestType: src_proto_markdown_editor_pb.ListFileRequest,
  responseType: src_proto_markdown_editor_pb.FilesList
};

MarkdownEditor.getFileContent = {
  methodName: "getFileContent",
  service: MarkdownEditor,
  requestStream: false,
  responseStream: true,
  requestType: src_proto_markdown_editor_pb.FileNameRequest,
  responseType: src_proto_markdown_editor_pb.FileContent
};

MarkdownEditor.saveFile = {
  methodName: "saveFile",
  service: MarkdownEditor,
  requestStream: false,
  responseStream: false,
  requestType: src_proto_markdown_editor_pb.SaveFileRequest,
  responseType: src_proto_markdown_editor_pb.OperationResult
};

MarkdownEditor.deleteFile = {
  methodName: "deleteFile",
  service: MarkdownEditor,
  requestStream: false,
  responseStream: false,
  requestType: src_proto_markdown_editor_pb.FileNameRequest,
  responseType: src_proto_markdown_editor_pb.OperationResult
};

MarkdownEditor.createFile = {
  methodName: "createFile",
  service: MarkdownEditor,
  requestStream: false,
  responseStream: false,
  requestType: src_proto_markdown_editor_pb.FileNameRequest,
  responseType: src_proto_markdown_editor_pb.OperationResult
};

exports.MarkdownEditor = MarkdownEditor;

function MarkdownEditorClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

MarkdownEditorClient.prototype.listAllFiles = function listAllFiles(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MarkdownEditor.listAllFiles, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

MarkdownEditorClient.prototype.getFileContent = function getFileContent(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(MarkdownEditor.getFileContent, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

MarkdownEditorClient.prototype.saveFile = function saveFile(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MarkdownEditor.saveFile, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

MarkdownEditorClient.prototype.deleteFile = function deleteFile(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MarkdownEditor.deleteFile, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

MarkdownEditorClient.prototype.createFile = function createFile(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(MarkdownEditor.createFile, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.MarkdownEditorClient = MarkdownEditorClient;

