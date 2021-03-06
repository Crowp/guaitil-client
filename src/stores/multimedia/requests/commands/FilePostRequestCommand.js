import environment from 'environment';
import { RollbackRequestCommand } from '../../../../utils/requests/commands/RollbackRequestCommand';
import { createFileDeleteByIdRequestCommand } from './FileDeleteByIdRequestCommand';
import MultimediaModel from '../../../../models/MultimediaModel';
import * as EffectUtility from '../../../../utils/EffectUtility';

export class FilePostRequestCommand extends RollbackRequestCommand {
  constructor(file, prefix, suffix) {
    super();
    this.file = file;
    this.prefix = prefix;
    this.suffix = suffix;
  }
  executeRequest = async () => {
    const endpoint = environment.api.multimedia.replace(':id', 'upload');
    const formData = createFileFormData(this.file, this.prefix, this.suffix);

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

const createFile = multimedia => {
  let byteString = atob(multimedia.base64.split(',')[1]);
  let ab = new ArrayBuffer(byteString.length);
  let ia = new Uint8Array(ab);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: multimedia.type });
  return new File([blob], multimedia.path, { type: multimedia.type });
};

const createFileFormData = (multimedia, prefix, suffix) => {
  const file = createFile(multimedia);
  const formData = new FormData();
  formData.append('file', file);
  formData.append('prefix', prefix);
  formData.append('suffix', suffix);
  formData.append('type', multimedia.type === 'image/jpeg' ? 'IMAGE' : 'VIDEO');
  return formData;
};
