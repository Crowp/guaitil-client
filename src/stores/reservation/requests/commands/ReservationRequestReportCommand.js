import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import * as EffectUtility from '../../../../utils/EffectUtility';
import { downloadFile } from '../../../../utils';

export class ReservationRequestReportCommand extends RequestCommand {
  constructor(query = '', type) {
    super();
    this.query = query;
    this.type = type;
  }
  executeRequestPdf = async () => {
    const token = EffectUtility._getHeaderToken();
    const endpoint = environment.api.reservations.replace(':id', this.query);
    return await downloadFile(endpoint, `reporte_reservaciones.${this.type}`, token);
  };
}

export const createReservationsRequestCommandReport = (query, type) => {
  return new ReservationRequestReportCommand(query, type);
};
