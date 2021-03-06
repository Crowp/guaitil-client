import { RollbackRequest } from '../../../utils/requests/RollbackRequest';
import { createFileListPostRequest } from '../../multimedia/requests/FileListPostRequest';
import { createMemberPostRequest } from './MemberPostRequest';

export class MemberLocalFilesPostRequest extends RollbackRequest {
  constructor(member, local) {
    super();
    this.filesListPostRequest = createFileListPostRequest(local.multimedia, 'local_', '_image');
    this.memberPostRequest = createMemberPostRequest(member, local);
  }

  onRequest = async () => {
    const responseFiles = await this.filesListPostRequest.onRequest();
    this.memberPostRequest.addMultimediaBeforeRequest(responseFiles);
    return await this.memberPostRequest.onRequest();
  };

  onRollback = async () => {
    await this.memberPostRequest.onRollback();
    await this.filesListPostRequest.onRollback();
  };
}

export const createMemberLocalFilesPostRequest = (member, local) => {
  return new MemberLocalFilesPostRequest(member, local);
};
