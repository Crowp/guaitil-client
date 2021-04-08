import { Request } from '../../../utils/requests/Request';
import { createProductsRequestCommandReport } from './commands/ProductRequestCommandReport';

export class ProductRequestReport extends Request {
  constructor(query = '', type) {
    super();
    this.productRequestCommandReport = createProductsRequestCommandReport(query, type);
  }

  onRequest = async () => {
    return await this.productRequestCommandReport.executeRequestPdf();
  };
}

export const createProductRequestReport = (query = '', type) => {
  return new ProductRequestReport(query, type);
};
