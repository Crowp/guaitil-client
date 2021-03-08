import environment from 'environment';
import { RollbackRequestCommand } from '../../../../utils/requests/commands/RollbackRequestCommand';
import { createFileDeleteByIdRequestCommand } from './FileDeleteByIdRequestCommand';
import MultimediaModel from '../../../../models/MultimediaModel';
import * as EffectUtility from '../../../../utils/EffectUtility';
import imageCompression from 'browser-image-compression';

export class FilePostRequestCommand extends RollbackRequestCommand {
  constructor(file, prefix, suffix) {
    super();
    this.file = file;
    this.prefix = prefix;
    this.suffix = suffix;
  }
  executeRequest = async () => {
    const endpoint = environment.api.multimedia.replace(':id', 'upload');
    const formData = await createFileFormData(this.file, this.prefix, this.suffix);

    const response = await EffectUtility.postToModel(MultimediaModel, endpoint, formData);

    this.ifResponseIsNotValidThrowsError(response);
    this.id = response.id;
    return response;
  };

  rollback = async () => {
    if (this.isExecuted) {
      const id = this.id;
      return await createFileDeleteByIdRequestCommand(id).executeRequest();
    }
  };
}

export const createFilePostRequestCommand = (files, prefix, suffix) => {
  return new FilePostRequestCommand(files, prefix, suffix);
};

const createFile = async multimedia => {
  const compressedBlob = await compressImageFile(multimedia);
  return new File([compressedBlob], multimedia.path, { type: multimedia.type });
};

const createFileFormData = async (multimedia, prefix, suffix) => {
  const file = await createFile(multimedia);
  debugger;
  console.log(file);
  const formData = new FormData();
  formData.append('file', file);
  formData.append('prefix', prefix);
  formData.append('suffix', suffix);
  formData.append('type', multimedia.type === 'image/jpeg' ? 'IMAGE' : 'VIDEO');
  return formData;
};

const compressImageFile = async multimedia => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  };
  const file = await imageCompression.getFilefromDataUrl(multimedia.base64, multimedia.path);
  return await imageCompression(file, options);
};
