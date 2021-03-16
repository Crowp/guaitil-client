import { Request } from '../../../utils/requests/Request';
import { createReservationDeleteRequestCommand } from './commands/ReservationDeleteRequestCommand';

export class ReservationDeleteRequest extends Request {
  constructor(query) {
    super();
    this.reservationDeleteRequestCommand = createReservationDeleteRequestCommand(query);
  }

  onRequest = async () => {
    return await this.reservationDeleteRequestCommand.executeRequest();
  };
}

export const createReservationDeleteRequest = query => {
  return new ReservationDeleteRequest(query);
};
