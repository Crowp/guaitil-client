import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createFileListPostRequest } from '../../multimedia/requests/FileListPostRequest';
import { createActivityPostRequestCommand } from './commands/ActivityPostRequestCommand';

export class ActivityFilesPostRequest extends RollbackRequest {
  constructor(activity) {
    super();
    this.filesListPostRequest = createFileListPostRequest(activity.multimedia, 'activity_', '_image');
    this.activityPostRequestCommand = createActivityPostRequestCommand(activity);
  }

  onRequest = async () => {
    const responseFiles = await this.filesListPostRequest.onRequest();
    this.activityPostRequestCommand.addMultimediaBeforeRequest(responseFiles);
    return await this.activityPostRequestCommand.executeRequest();
  };

  onRollback = async () => {
    await this.activityPostRequestCommand.rollback();
    await this.filesListPostRequest.onRollback();
  };
}

export const createActivityFilesPostRequest = activity => {
  return new ActivityFilesPostRequest(activity);
};
