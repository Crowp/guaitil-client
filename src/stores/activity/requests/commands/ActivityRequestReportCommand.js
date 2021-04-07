import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import * as EffectUtility from '../../../../utils/EffectUtility';
import { downloadFile } from '../../../../utils';

export class ActivityRequestCommandReport extends RequestCommand {
  constructor(query = '', type) {
    super();
    this.query = query;
    this.type = type;
  }
  executeRequestPdf = async () => {
    const token = EffectUtility._getHeaderToken();
    const endpoint = environment.api.activities.replace(':id', this.query);
    return await downloadFile(endpoint, `reporte_actividades.${this.type}`, token);
  };
}

export const createActivitiesRequestCommandReport = (query, type) => {
  return new ActivityRequestCommandReport(query, type);
};
