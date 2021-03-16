import { Request } from '../../../utils/requests/Request';
import { createReservationPutRequestCommand } from './commands/ReservationPutRequestCommand';

export class ReservationPutRequest extends Request {
  constructor(reservation) {
    super();
    this.reservationPutRequestCommand = createReservationPutRequestCommand(reservation);
  }

  onRequest = async () => {
    return await this.reservationPutRequestCommand.executeRequest();
  };
}

export const createReservationPutRequest = reservation => {
  return new ReservationPutRequest(reservation);
};
