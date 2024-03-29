// package:
// file: src/grpc/protos/chat1.proto

var src_grpc_protos_chat1_pb = require("./chat_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var ChatService = (function () {
  function ChatService() {}
  ChatService.serviceName = "ChatService";
  return ChatService;
}());

ChatService.sendMessage = {
  methodName: "sendMessage",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: src_grpc_protos_chat1_pb.ChatMessage,
  responseType: src_grpc_protos_chat1_pb.Empty
};

ChatService.receiveMessage = {
  methodName: "receiveMessage",
  service: ChatService,
  requestStream: false,
  responseStream: true,
  requestType: src_grpc_protos_chat1_pb.Empty,
  responseType: src_grpc_protos_chat1_pb.ChatMessage
};

ChatService.typeMessage = {
  methodName: "typeMessage",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: src_grpc_protos_chat1_pb.Notification,
  responseType: src_grpc_protos_chat1_pb.Empty
};

exports.ChatService = ChatService;

function ChatServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ChatServiceClient.prototype.sendMessage = function sendMessage(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.sendMessage, {
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

ChatServiceClient.prototype.receiveMessage = function receiveMessage(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(ChatService.receiveMessage, {
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

ChatServiceClient.prototype.typeMessage = function typeMessage(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.typeMessage, {
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

exports.ChatServiceClient = ChatServiceClient;

