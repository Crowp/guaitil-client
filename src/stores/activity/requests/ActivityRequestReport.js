import { Request } from '../../../utils/requests/Request';
import { createActivitiesRequestCommandReport } from './commands/ActivityRequestReportCommand';

export class ActivityRequestReport extends Request {
  constructor(query = '', type) {
    super();
    this.activityRequestCommandReport = createActivitiesRequestCommandReport(query, type);
  }

  onRequest = async () => {
    return await this.activityRequestCommandReport.executeRequestPdf();
  };
}

export const createActivitiesRequestReport = (query = '', type) => {
  return new ActivityRequestReport(query, type);
};
