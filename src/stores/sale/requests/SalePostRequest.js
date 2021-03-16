import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createSalePostRequestCommand } from './commands/SalePostRequestCommand';

export class SalePostRequest extends RollbackRequest {
  constructor(sale) {
    super();
    this.salePostRequestCommand = createSalePostRequestCommand(sale);
  }

  onRequest = async () => {
    return await this.salePostRequestCommand.executeRequest();
  };

  onRollback = async () => {
    await this.salePostRequestCommand.rollback();
  };
}

export const createSalePostRequest = sale => {
  return new SalePostRequest(sale);
};
