import { Request } from '../../../utils/requests/Request';
import { createReservationPutRequestCommand } from './commands/ReservationPutRequestCommand';

export class ReservationPutRequest extends Request {
  constructor(product) {
    super();
    this.reservationPutRequestCommand = createReservationPutRequestCommand(product);
  }

  onRequest = async () => {
    return await this.reservationPutRequestCommand.executeRequest();
  };
}

export const createReservationPutRequest = product => {
  return new ReservationPutRequest(product);
};
