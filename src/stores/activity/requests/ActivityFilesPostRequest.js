import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createFileListPostRequest } from '../../multimedia/requests/FileListPostRequest';
import { createActivityPostRequestCommand } from './commands/ActivityPostRequestCommand';

export class ActivityFilesPostRequest extends RollbackRequest {
  constructor(activity) {
    super();
    this.filesListPostRequest = createFileListPostRequest(activity.newMultimedia);
    this.activityPostRequestCommand = createActivityPostRequestCommand(activity);
  }

  onRequest = async () => {
    const responseFiles = await this.filesListPostRequest.getResponse();
    this.activityPostRequestCommand.addMultimediaBeforeRequest(responseFiles);
    return await this.activityPostRequestCommand.executeRequest();
  };

  onRollback = async () => {
    await this.filesListPostRequest.onRollback();
  };
}

export const createActivityFilesPostRequest = activity => {
  return new ActivityFilesPostRequest(activity);
};
