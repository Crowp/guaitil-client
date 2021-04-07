import { Request } from '../../../utils/requests/Request';
import { createReservationsRequestCommandReport } from './commands/ReservationRequestReportCommand';

export class ReservationRequestReport extends Request {
  constructor(query = '', type) {
    super();
    this.reservationRequestCommandReport = createReservationsRequestCommandReport(query, type);
  }

  onRequest = async () => {
    return await this.reservationRequestCommandReport.executeRequestPdf();
  };
}

export const createReservationRequestReport = (query = '', type) => {
  return new ReservationRequestReport(query, type);
};
