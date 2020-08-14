import React, { useState, useContext } from 'react';

import WizardInput from './WizardInput';
import { Media } from 'reactstrap';
import FalconDropzone from '../../components/common/FalconDropzone';
import avatarImg from '../../../template/assets/img/team/avatar.png';
import { isIterableArray } from '../../helpers/utils';
import Avatar from '../../components/common/Avatar';
import cloudUpload from '../../../template/assets/img/icons/cloud-upload.svg';
import { Col, Row } from 'reactstrap';
import { PersonContext } from '../../context';

const LocalForm = ({ register, errors }) => {
  const { local, handleInputChangeLocal } = useContext(PersonContext);
  const [avatar, setAvatar] = useState([...(local.files ? local.files : []), { src: avatarImg }]);
  console.log({ local });
  return (
    <>
      <Row form>
        <Col>
          <WizardInput
            label="Nombre del local"
            placeholder="Nombre..."
            name="name"
            value={local}
            onChange={({ target }) => {
              handleInputChangeLocal(target);
            }}
            id="name"
            className="input-spin-none"
            innerRef={register({
              required: 'Campo obligatorio',
              minLength: {
                value: 2,
                message: 'Password must have at least 2 characters'
              }
            })}
            errors={errors}
          />
          <WizardInput
            label="Número de telefono*"
            placeholder="Telefono"
            value={local}
            id="telephone"
            name="telephone"
            onChange={({ target }) => {
              handleInputChangeLocal(target);
            }}
            innerRef={register({
              required: 'Campo obligatorio',
              minLength: {
                value: 8,
                message: 'EL número de telefono debe ser de al menos de 8 caracteres'
              }
            })}
            errors={errors}
          />
        </Col>
      </Row>
      <WizardInput
        type="textarea"
        label="Descripción"
        name="description"
        value={local}
        rows="4"
        onChange={({ target }) => {
          handleInputChangeLocal(target);
        }}
        style={{ resize: 'none' }}
        id="description"
        innerRef={register({
          required: true
        })}
        errors={errors}
      />
      <WizardInput
        label="Date of Birth"
        id="date"
        value={local}
        onChange={({ target }) => {
          handleInputChangeLocal(target);
        }}
        customType="datetime"
        name="birthDate"
        placeholder="DD/MM/YYYY"
        errors={errors}
      />

      <WizardInput
        type="textarea"
        label="Address"
        name="address"
        rows="4"
        value={local}
        id="address"
        onChange={({ target }) => {
          handleInputChangeLocal(target);
        }}
        innerRef={register({
          required: false
        })}
        errors={errors}
      />
      <Media className="flex-center pb-3 d-block d-md-flex text-center mb-2">
        <Avatar size="4xl" className="mb-2" src={isIterableArray(avatar) ? avatar[0]?.base64 || avatar[0]?.src : ''} />
        <Media body className="ml-md-4">
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
                    <p className="fs-0 mb-0 text-700">Upload your profile picture</p>
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
