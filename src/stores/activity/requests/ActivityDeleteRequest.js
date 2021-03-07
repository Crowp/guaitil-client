import { Request } from '../../../utils/requests/Request';
import { createActivityDeleteRequestCommand } from './commands/ActivityDeleteRequestCommand';

export class ActivityDeleteRequest extends Request {
  constructor(query) {
    super();
    this.activityDeleteRequestCommand = createActivityDeleteRequestCommand(query);
  }

  onRequest = async () => {
    return await this.activityDeleteRequestCommand.executeRequest();
  };
}

export const createActivityDeleteRequest = query => {
  return new ActivityDeleteRequest(query);
};
