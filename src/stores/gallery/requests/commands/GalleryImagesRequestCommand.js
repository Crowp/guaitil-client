import environment from 'environment';
import { RequestCommand } from '../../../../utils/requests/commands/RequestCommand';

import GalleryModel from '../../../../models/GalleryModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class GalleryImagesRequestCommand extends RequestCommand {
  executeRequest = async () => {
    const endpoint = environment.api.gallery;
    return await EffectUtility.getToModel(GalleryModel, endpoint);
  };
}

export const createGalleryImagesRequestCommand = () => {
  return new GalleryImagesRequestCommand();
};
