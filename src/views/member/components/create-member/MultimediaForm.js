import React, { useState, useContext } from 'react';

import { Media } from 'reactstrap';
import FalconDropzone from '../../../components/common/FalconDropzone';
import avatarImg from '../../../../template/assets/img/team/avatar.png';
import cloudUpload from '../../../../template/assets/img/icons/cloud-upload.svg';
import { LocalContext } from '../../../context';

const LocalForm = () => {
  const { local, handleInputChangeLocal } = useContext(LocalContext);
  const [avatar, setAvatar] = useState([...(local.files ? local.files : []), { src: avatarImg }]);
  return (
    <>
      <Media className="flex-center pb-3 d-block d-md-flex text-center mb-2">
        <Media body>
          <FalconDropzone
            files={avatar}
            onChange={files => {
              setAvatar(files);
              const localFiles = local.files ? local.files : [];
              const totalFiles = [...localFiles, ...files];
              handleInputChangeLocal({ name: 'files', value: totalFiles });
            }}
            multiple={true}
            accept="image/*"
            placeholder={
              <>
                <Media className=" fs-0 mx-auto d-inline-flex align-items-center">
                  <img src={cloudUpload} alt="" width={25} className="mr-2" />
                  <Media>
                    <p className="fs-0 mb-0 text-700">Sube las imagenes del local</p>
                  </Media>
                </Media>
                <p className="mb-0 w-75 mx-auto text-500">Upload a 300x300 jpg image with a maximum size of 400KB</p>
              </>
            }
          />
        </Media>
      </Media>
    </>
  );
};

export default LocalForm;
