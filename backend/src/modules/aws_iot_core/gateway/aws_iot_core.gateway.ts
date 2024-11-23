import { Inject, Injectable, OnModuleInit } from '@nestjs/common'
import * as AWSIoTDeviceSDK from "aws-iot-device-sdk";
@Injectable()
export class AwsIotCoreService implements OnModuleInit {
  constructor() {}

  private device: AWSIoTDeviceSDK.device

  async onModuleInit() {
    console.log('AWS IoT Core Service initialized')
  }

  private initializeMqttClient() {
    this.device = AWSIoTDeviceSDK.device({
      clientId: `nest-js-client_xyz_${uuidv4()}`,
      protocol: "wss",
      port: 443,
      host: process.env.AWS_ENDPOINT,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      autoResubscribe: true,
      protocolVersion: 5
    });
}
