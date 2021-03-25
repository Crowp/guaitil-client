import { Request } from '../../../utils/requests/Request';
import { createMembersRequestCommandPDF } from './commands/MemberRequestCommandPDF';

export class MembersRequestPDF extends Request {
  constructor(query = '') {
    super();
    this.membersRequestCommandPDF = createMembersRequestCommandPDF(query);
  }

  onRequest = async () => {
    return await this.membersRequestCommandPDF.executeRequestPdf();
  };
}

export const createMembersRequestPDF = (query = '') => {
  return new MembersRequestPDF(query);
};
