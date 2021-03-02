import { RequestCommand } from './RequestCommand';
import { requestCreateMultimedia, requestDeleteMultimedia } from '../../../stores/multimedia/MultimediaEffect';

export class FilePostRequestCommand extends RequestCommand {
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
