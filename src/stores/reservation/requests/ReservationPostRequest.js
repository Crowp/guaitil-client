import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createReservationPostRequestCommand } from './commands/ReservationPostRequestCommand';

export class ReservationPostRequest extends RollbackRequest {
  constructor(reservation) {
    super();
    this.reservationPostRequestCommand = createReservationPostRequestCommand(reservation);
  }

  onRequest = async () => {
    return await this.reservationPostRequestCommand.executeRequest();
  };

  onRollback = async () => {
    await this.reservationPostRequestCommand.rollback();
  };
}

export const createReservationPostRequest = reservation => {
  return new ReservationPostRequest(reservation);
};
