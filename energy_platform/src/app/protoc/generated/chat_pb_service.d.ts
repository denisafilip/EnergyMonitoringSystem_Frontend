// package:
// file: src/grpc/protos/chat1.proto

import * as src_grpc_protos_chat1_pb from "./chat_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ChatServicesendMessage = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof src_grpc_protos_chat1_pb.ChatMessage;
  readonly responseType: typeof src_grpc_protos_chat1_pb.Empty;
};

type ChatServicereceiveMessage = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof src_grpc_protos_chat1_pb.Empty;
  readonly responseType: typeof src_grpc_protos_chat1_pb.ChatMessage;
};

type ChatServicetypeMessage = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof src_grpc_protos_chat1_pb.Notification;
  readonly responseType: typeof src_grpc_protos_chat1_pb.Empty;
};

export class ChatService {
  static readonly serviceName: string;
  static readonly sendMessage: ChatServicesendMessage;
  static readonly receiveMessage: ChatServicereceiveMessage;
  static readonly typeMessage: ChatServicetypeMessage;
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

export class ChatServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  sendMessage(
    requestMessage: src_grpc_protos_chat1_pb.ChatMessage,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: src_grpc_protos_chat1_pb.Empty|null) => void
  ): UnaryResponse;
  sendMessage(
    requestMessage: src_grpc_protos_chat1_pb.ChatMessage,
    callback: (error: ServiceError|null, responseMessage: src_grpc_protos_chat1_pb.Empty|null) => void
  ): UnaryResponse;
  receiveMessage(requestMessage: src_grpc_protos_chat1_pb.Empty, metadata?: grpc.Metadata): ResponseStream<src_grpc_protos_chat1_pb.ChatMessage>;
  typeMessage(
    requestMessage: src_grpc_protos_chat1_pb.Notification,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: src_grpc_protos_chat1_pb.Empty|null) => void
  ): UnaryResponse;
  typeMessage(
    requestMessage: src_grpc_protos_chat1_pb.Notification,
    callback: (error: ServiceError|null, responseMessage: src_grpc_protos_chat1_pb.Empty|null) => void
  ): UnaryResponse;
}

