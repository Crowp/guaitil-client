import { Request } from '../../../utils/requests/Request';
import { createSalesRequestCommandReport } from './commands/SaleRequestCommandReport';

export class SaleRequestReport extends Request {
  constructor(query = '', type) {
    super();
    this.salesRequestCommandReport = createSalesRequestCommandReport(query, type);
  }

  onRequest = async () => {
    return await this.salesRequestCommandReport.executeRequestPdf();
  };
}

export const createSaleRequestReport = (query = '', type) => {
  return new SaleRequestReport(query, type);
};
