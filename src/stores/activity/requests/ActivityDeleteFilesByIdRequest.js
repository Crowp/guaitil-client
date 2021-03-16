import { Request } from '../../../utils/requests/Request';
import { createActivityDeleteRequest } from './ActivityDeleteRequest';

export class ActivityDeleteFilesByIdRequest extends Request {
  constructor(activityId, idFile) {
    super();
    const query = `delete-multimedia-by-id?id=${activityId}&idMultimedia=${idFile}`;
    this.activityDeleteRequest = createActivityDeleteRequest(query);
  }

  onRequest = async () => {
    return await this.activityDeleteRequest.onRequest();
  };
}

export const createActivityDeleteFilesByIdRequest = (activityId, idFile) => {
  return new ActivityDeleteFilesByIdRequest(activityId, idFile);
};
