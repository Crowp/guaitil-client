import { Request } from '../../../utils/requests/Request';
import { createActivitiesRequestCommand } from './commands/ActivitiesRequestCommand';

export class ActivitiesRequest extends Request {
  constructor(query = '') {
    super();
    this.activitiesRequestCommand = createActivitiesRequestCommand(query);
  }

  onRequest = async () => {
    return await this.activitiesRequestCommand.executeRequest();
  };
}

export const createActivitiesRequest = (query = '') => {
  return new ActivitiesRequest(query);
};
