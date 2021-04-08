import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import * as EffectUtility from '../../../../utils/EffectUtility';
import { downloadFile } from '../../../../utils';

export class ProductRequestCommandReport extends RequestCommand {
  constructor(query = '', type) {
    super();
    this.query = query;
    this.type = type;
  }
  executeRequestPdf = async () => {
    const token = EffectUtility._getHeaderToken();
    const endpoint = environment.api.products.replace(':id', this.query);
    return await downloadFile(endpoint, `reporte_productos.${this.type}`, token);
  };
}

export const createProductsRequestCommandReport = (query, type) => {
  return new ProductRequestCommandReport(query, type);
};
