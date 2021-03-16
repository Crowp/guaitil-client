import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import GalleryModel from '../../../../models/GalleryModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class GalleryPostRequestCommand extends RequestCommand {
  multimedia = [];
  executeRequest = async () => {
    const endpoint = environment.api.gallery;
    const response = await EffectUtility.postToModel(GalleryModel, endpoint, { multimedia: this.multimedia });
    this.ifResponseIsNotValidThrowsError(response);
    return response;
  };

  addMultimediaBeforeRequest = files => {
    this.multimedia = files;
  };
}

export const createGalleryPostRequestCommand = () => {
  return new GalleryPostRequestCommand();
};
