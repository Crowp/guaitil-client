import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import * as EffectUtility from '../../../../utils/EffectUtility';
import { downloadFile } from '../../../../utils';

export class LocalsRequestCommandReport extends RequestCommand {
  constructor(query = '', type) {
    super();
    this.query = query;
    this.type = type;
  }
  executeRequestPdf = async () => {
    const token = EffectUtility._getHeaderToken();
    const endpoint = environment.api.locals.replace(':id', this.query);
    return await downloadFile(endpoint, `reporte_locales.${this.type}`, token);
  };
}

export const createLocalsRequestCommandReport = (query, type) => {
  return new LocalsRequestCommandReport(query, type);
};
