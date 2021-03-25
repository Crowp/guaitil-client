import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import HttpUtility from '../../../../utils/HttpUtility';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class MembersRequestCommandPDF extends RequestCommand {
  constructor(query = '') {
    super();
    this.query = query;
  }
  executeRequestPdf = async () => {
    const token = EffectUtility._getHeaderToken();
    const newToken = {
      ...token,
      headers: {
        ...token.headers,
        'Content-Type': 'application/pdf'
      }
    };
    const params = {};
    const endpoint = environment.api.members.replace(':id', this.query);
    await HttpUtility.get(endpoint, params, newToken)
      .then(response => {
        const { data } = response;
        return data;
      })
      .then(data => {
        const url = window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'reporte_miembros.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  };
}

export const createMembersRequestCommandPDF = query => {
  return new MembersRequestCommandPDF(query);
};
