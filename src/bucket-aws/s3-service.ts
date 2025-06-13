// s3.service.ts
import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
} from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import * as mime from 'mime-types';
import { File as MulterFile } from 'multer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  constructor(private readonly configService: ConfigService) {}
  private s3 = new S3Client({
    region: this.configService.get<string>('AWS_REGION'),
    credentials: {
      accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY')!,
      secretAccessKey: this.configService.get<string>('AWS_SECRET_KEY')!,
    },
  });
  async uploadFile(file: MulterFile, folder = 'products') {
    const ext = mime.extension(file.mimetype);
    const key = `${folder}/${uuid()}.${ext}`;

    const input: PutObjectCommandInput = {
      Bucket: this.configService.get('AWS_BUCKET')!,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    await this.s3.send(new PutObjectCommand(input));

    return `https://${this.configService.get('AWS_BUCKET')}.s3.${this.configService.get('AWS_REGION')}.amazonaws.com/${key}`;
  }
}
