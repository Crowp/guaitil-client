import { Request } from '../../../utils/requests/Request';
import { createMembersRequestCommandReport } from './commands/MembersRequestReport';

export class MembersRequestReport extends Request {
  constructor(query = '', type) {
    super();
    this.membersRequestCommandReport = createMembersRequestCommandReport(query, type);
  }

  onRequest = async () => {
    return await this.membersRequestCommandReport.executeRequestPdf();
  };
}

export const createMembersRequestReport = (query = '', type) => {
  return new MembersRequestReport(query, type);
};
