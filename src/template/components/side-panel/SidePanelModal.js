import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import classNames from 'classnames';
import { Button, CustomInput, Modal, ModalHeader, ButtonGroup, Label, Media } from 'reactstrap';
import AppContext from '../../context/Context';
import defaultModeImg from '../../assets/img/generic/falcon-mode-default.jpg';
import darkModeImg from '../../assets/img/generic/falcon-mode-dark.jpg';
import leftArrowFromLeft from '../../assets/img/icons/left-arrow-from-left.svg';
import arrowsH from '../../assets/img/icons/arrows-h.svg';
import Flex from '../common/Flex';
import ScrollBarCustom from '../common/ScrollBarCustom';
import { createCookie, getCookieValue } from '../../helpers/utils';

const SidePanelModal = ({ autoShow, showOnce, autoShowDelay, cookieExpireTime }) => {
  const {
    isOpenSidePanel,
    toggleModal,
    isFluid,
    setIsFluid,
    isRTL,
    setIsRTL,
    isDark,
    setIsDark,
    setIsOpenSidePanel
  } = useContext(AppContext);

  useEffect(() => {
    let modalStatus = getCookieValue('modalClose');

    if (modalStatus === null && autoShow) {
      setTimeout(() => {
        setIsOpenSidePanel(prev => !prev);
        showOnce && createCookie('modalClose', false, cookieExpireTime);
      }, autoShowDelay);
    }
  }, [autoShow, showOnce, setIsOpenSidePanel, autoShowDelay, cookieExpireTime]);

  return (
    <Modal
      isOpen={isOpenSidePanel}
      toggle={toggleModal}
      modalClassName="overflow-hidden modal-fixed-right modal-theme"
      className="modal-dialog-vertical"
      contentClassName="vh-100 border-0"
    >
      <ModalHeader tag="div" toggle={toggleModal} className="modal-header-settings">
        <div className="py-1 flex-grow-1">
          <h5 className="text-white">
            <FontAwesomeIcon icon="palette" className="mr-2 fs-0" />
            Configutaciones
          </h5>
          <p className="mb-0 fs--1 text-white opacity-75">Añada su propio estilo</p>
        </div>
      </ModalHeader>
      <ScrollBarCustom
        className="modal-body"
        contentProps={{
          renderer: ({ elementRef, ...restProps }) => (
            <span
              {...restProps}
              ref={elementRef}
              className={classNames('p-card position-absolute', { 'border-left': isDark })}
            />
          )
        }}
      >
        <h5 className="fs-0">Tema</h5>
        <p className="fs--1">Escoge el tema que deseas para la plataforma.</p>
        <ButtonGroup className="btn-group-toggle btn-block">
          <Button color="theme-default" className={classNames('custom-radio-success', { active: !isDark })}>
            <Label for="theme-mode-default" className="cursor-pointer hover-overlay">
              <img className="w-100" src={defaultModeImg} alt="" />
            </Label>
            <CustomInput
              type="radio"
              id="theme-mode-default"
              label="Light"
              checked={!isDark}
              onChange={({ target }) => setIsDark(!target.checked)}
            />
          </Button>
          <Button color="theme-dark" className={classNames('custom-radio-success', { active: isDark })}>
            <Label for="theme-mode-dark" className="cursor-pointer hover-overlay">
              <img className="w-100" src={darkModeImg} alt="" />
            </Label>
            <CustomInput
              type="radio"
              id="theme-mode-dark"
              label="Dark"
              checked={isDark}
              onChange={({ target }) => setIsDark(target.checked)}
            />
          </Button>
        </ButtonGroup>
        <hr />
        <Flex justify="between">
          <Media className="flex-grow-1">
            <img src={leftArrowFromLeft} alt="" width={20} className="mr-2" />
            <Media body>
              <h5 className="fs-0">RTL Mode</h5>
              <p className="fs--1 mb-0">Cambia la dirección</p>
            </Media>
          </Media>
          <CustomInput
            type="switch"
            id="rtl-switch"
            checked={isRTL}
            onChange={({ target }) => setIsRTL(target.checked)}
          />
        </Flex>
        <hr />
        <Flex justify="between">
          <Media className="flex-grow-1">
            <img src={arrowsH} alt="" width={20} className="mr-2" />
            <Media body>
              <h5 className="fs-0">Fluid Layout</h5>
              <p className="fs--1 mb-0">Escoge el ancho del contenedor</p>
            </Media>
          </Media>
          <CustomInput
            type="switch"
            id="fluid-switch"
            checked={isFluid}
            onChange={({ target }) => setIsFluid(target.checked)}
          />
        </Flex>
      </ScrollBarCustom>
    </Modal>
  );
};

SidePanelModal.propTypes = {
  autoShow: PropTypes.bool,
  showOnce: PropTypes.bool,
  autoShowDelay: PropTypes.number,
  cookieExpireTime: PropTypes.number
};

SidePanelModal.defaultProps = {
  autoShow: true,
  showOnce: true,
  autoShowDelay: 3000,
  cookieExpireTime: 7200000
};

export default SidePanelModal;
