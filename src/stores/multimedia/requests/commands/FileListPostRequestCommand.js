import { RequestCompositeCommand } from '../../../../utils/requests/commands/RequestCompositeCommand';
import { FilePostRequestCommand } from './FilePostRequestCommand';

export class FileListPostRequestCommand extends RequestCompositeCommand {
  constructor(filesList = [], prefix, suffix) {
    super();
    filesList.forEach(file => this._addChild(new FilePostRequestCommand(file, prefix, suffix)));
  }
}

export const createFileListPostCommand = (files, prefix, suffix) => {
  return new FileListPostRequestCommand(files, prefix, suffix);
};
