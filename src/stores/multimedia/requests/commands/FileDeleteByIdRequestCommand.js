import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import MultimediaModel from '../../../../models/MultimediaModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class FileDeleteByIdRequestCommand extends RequestCommand {
  constructor(query) {
    super();
    this.query = query;
  }
  executeRequest = async () => {
    const endpoint = environment.api.multimedia.replace(':id', this.query);
    return await EffectUtility.deleteToModel(MultimediaModel, endpoint);
  };
}

export const createFileDeleteByIdRequestCommand = query => {
  return new FileDeleteByIdRequestCommand(query);
};
