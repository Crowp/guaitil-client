import { Request } from '../../../utils/requests/Request';
import { createLocalDeleteRequest } from './LocalDeleteRequest';

export class LocalDeleteFilesbyIdRequest extends Request {
  constructor(idlocal, idFile) {
    super();
    const query = `delete-multimedia-by-id?id=${idlocal}&idMultimedia=${idFile}`;
    this.localDeleteRequest = createLocalDeleteRequest(query);
  }

  onRequest = async () => {
    return await this.localDeleteRequest.getResponse();
  };
}

export const createLocalDeleteFilesbyIdRequest = (idlocal, idFile) => {
  return new LocalDeleteFilesbyIdRequest(idlocal, idFile);
};
