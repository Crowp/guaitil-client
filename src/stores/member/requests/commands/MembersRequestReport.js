import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import * as EffectUtility from '../../../../utils/EffectUtility';
import { downloadFile } from '../../../../utils';

export class MembersRequestCommandReport extends RequestCommand {
  constructor(query = '', type) {
    super();
    this.query = query;
    this.type = type;
  }
  executeRequestPdf = async () => {
    const token = EffectUtility._getHeaderToken();
    const endpoint = environment.api.members.replace(':id', this.query);
    return await downloadFile(endpoint, `reporte_miembros.${this.type}`, token);
  };
}

export const createMembersRequestCommandReport = (query, type) => {
  return new MembersRequestCommandReport(query, type);
};
