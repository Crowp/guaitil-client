import { Request } from '../../../utils/requests/Request';
import { createAuthsRequestCommandReport } from './commands/AuthRequestReport';

export class AuthRequestReport extends Request {
  constructor(query = '', type) {
    super();
    this.authRequestCommandReport = createAuthsRequestCommandReport(query, type);
  }

  onRequest = async () => {
    return await this.authRequestCommandReport.executeRequestPdf();
  };
}

export const createAuthRequestReport = (query = '', type) => {
  return new AuthRequestReport(query, type);
};
