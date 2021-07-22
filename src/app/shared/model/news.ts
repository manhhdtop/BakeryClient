import { UploadResponse } from 'src/app/shared/model/upload-response';

export interface News {
  id: number;
  slug: string;
  name: string;
  description: string;
  content: string;
  image: UploadResponse;
  read: number;
  like: number;
  status: number;
  createdDate: Date;
  updatedDate: Date;
}
