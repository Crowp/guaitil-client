import { Request } from '../../../utils/requests/Request';
import { createLocalsRequestCommandReport } from './commands/LocalRequestReport';

export class LocalsRequestReport extends Request {
  constructor(query = '', type) {
    super();
    this.localsRequestCommandReport = createLocalsRequestCommandReport(query, type);
  }

  onRequest = async () => {
    return await this.localsRequestCommandReport.executeRequestPdf();
  };
}

export const createLocalsRequestReport = (query = '', type) => {
  return new LocalsRequestReport(query, type);
};
