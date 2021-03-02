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
    console.log(this.response, this.isExecuted);
    if (this.isExecuted) {
      const id = this.response?.id;
      console.log(this.response);
      return await requestDeleteMultimedia(id);
    }
  };
}
