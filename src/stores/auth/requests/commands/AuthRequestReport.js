import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import * as EffectUtility from '../../../../utils/EffectUtility';
import { downloadFile } from '../../../../utils';

export class AuthRequestCommandReport extends RequestCommand {
  constructor(query = '', type) {
    super();
    this.query = query;
    this.type = type;
  }
  executeRequestPdf = async () => {
    console.log('object');
    const token = EffectUtility._getHeaderToken();
    const endpoint = environment.auth.users.replace(':id', this.query);
    console.log(endpoint);
    return await downloadFile(endpoint, `reporte_usuarios.${this.type}`, token);
  };
}

export const createAuthsRequestCommandReport = (query, type) => {
  return new AuthRequestCommandReport(query, type);
};
