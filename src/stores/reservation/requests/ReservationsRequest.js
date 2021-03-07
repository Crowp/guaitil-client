import { Request } from '../../../utils/requests/Request';
import { createReservationsRequestCommand } from './commands/ReservationsRequestCommand';

export class ReservationsRequest extends Request {
  constructor(query = '') {
    super();
    this.reservationsRequestCommand = createReservationsRequestCommand(query);
  }

  onRequest = async () => {
    return await this.reservationsRequestCommand.executeRequest();
  };
}

export const createReservationsRequest = (query = '') => {
  return new ReservationsRequest(query);
};
