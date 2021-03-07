import { Request } from '../../../utils/requests/Request';
import { createReservationsRequestCommand } from './commands/ReservationsRequestCommand';

export class ReservationsRequest extends Request {
  constructor(query = '') {
    super();
    this.ReservationsRequestCommand = createReservationsRequestCommand(query);
  }

  onRequest = async () => {
    return await this.ReservationsRequestCommand.executeRequest();
  };
}

export const createReservationsRequest = (query = '') => {
  return new ReservationsRequest(query);
};
