import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import GalleryModel from '../../../../models/GalleryModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class GalleryDeleteFilesByIdRequestCommand extends RequestCommand {
  constructor(query) {
    super();
    this.query = query;
  }
  executeRequest = async () => {
    const endpoint = environment.api.gallery + '/' + this.query;
    return await EffectUtility.deleteToModel(GalleryModel, endpoint);
  };
}

export const createGalleryDeleteFilesByIdRequestCommand = query => {
  return new GalleryDeleteFilesByIdRequestCommand(query);
};
