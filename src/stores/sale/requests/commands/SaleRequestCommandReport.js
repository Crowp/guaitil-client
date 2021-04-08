import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import * as EffectUtility from '../../../../utils/EffectUtility';
import { downloadFile } from '../../../../utils';

export class SaleRequestCommandReport extends RequestCommand {
  constructor(query = '', type) {
    super();
    this.query = query;
    this.type = type;
  }
  executeRequestPdf = async () => {
    const token = EffectUtility._getHeaderToken();
    const endpoint = environment.api.sales.replace(':id', this.query);
    return await downloadFile(endpoint, `reporte_ventas.${this.type}`, token);
  };
}

export const createSalesRequestCommandReport = (query, type) => {
  return new SaleRequestCommandReport(query, type);
};
