import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createFileListPostRequest } from '../../multimedia/requests/FileListPostRequest';
import { createActivityPutRequestCommand } from './commands/ActivityPutRequestCommand';

export class ActivityFilesPutRequest extends RollbackRequest {
  constructor(activity) {
    super();
    this.filesListPostRequest = createFileListPostRequest(activity.newMultimedia, 'activity_', '_image');
    this.activiyPutRequestCommand = createActivityPutRequestCommand(activity);
  }

  onRequest = async () => {
    const responseFiles = await this.filesListPostRequest.onRequest();
    this.activiyPutRequestCommand.addMultimediaBeforeRequest(responseFiles);
    return await this.activiyPutRequestCommand.executeRequest();
  };

  onRollback = async () => {
    await this.filesListPostRequest.onRollback();
  };
}

export const createActivityFilesPutRequest = activity => {
  return new ActivityFilesPutRequest(activity);
};
