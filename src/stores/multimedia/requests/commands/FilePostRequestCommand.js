import { RollbackRequestCommand } from '../../../../utils/requests/commands/RollbackRequestCommand';
import { requestCreateMultimedia, requestDeleteMultimedia } from '../../../multimedia/MultimediaEffect';

export class FilePostRequestCommand extends RollbackRequestCommand {
  constructor(file, prefix, suffix) {
    super();
    this.file = file;
    this.prefix = prefix;
    this.suffix = suffix;
  }
  executeRequest = async () => {
    this.response = await requestCreateMultimedia(this.file, this.prefix, this.suffix);
    this.ifResponseIsNotValidThrowsError();
    return this.response;
  };

  rollback = async () => {
    if (this.isExecuted) {
      const id = this.response?.id;
      return await requestDeleteMultimedia(id);
    }
  };
}
