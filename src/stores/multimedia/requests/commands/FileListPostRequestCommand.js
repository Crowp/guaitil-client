import { RollbackRequestCompositeCommand } from '../../../../utils/requests/commands/RollbackRequestCompositeCommand';
import { createFilePostRequestCommand } from './FilePostRequestCommand';

export class FileListPostRequestCommand extends RollbackRequestCompositeCommand {
  constructor(filesList = [], prefix, suffix) {
    super();
    filesList.forEach(file => this._addChild(createFilePostRequestCommand(file, prefix, suffix)));
  }
}

export const createFileListPostCommand = (files, prefix, suffix) => {
  return new FileListPostRequestCommand(files, prefix, suffix);
};
