import styled from 'styled-components';
import { useContext, createContext, useState, cloneElement } from 'react';
import { Button, Modal as BsModal, Tooltip } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import { TransparentCircleButton } from './PillButtons';
import { BsX } from 'react-icons/bs';

const ModalContext = createContext();

function ModalMenu({ children }) {
  const [openName, setOpenName] = useState('');
  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

const StyledCloseButton = styled(TransparentCircleButton)`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  font-size: 4rem;
  right: 1rem;
  margin: 0.5rem 1rem;
`;

function Open({ children, opens: opensWindowName }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}

function Close({ children }) {
  const { close } = useContext(ModalContext);
  const originalOnClick = children.props.onClick;

  return cloneElement(children, {
    onClick: (e) => {
      if (originalOnClick) {
        originalOnClick(e);
      }
      close();
    },
  });
}

function Window({ children, name, opened = false, dialogClassName, onClose }) {
  const { openName, close, open } = useContext(ModalContext);

  if (opened) {
    open(name);
  }

  if (name !== openName) {
    return null;
  }
  return createPortal(
    <BsModal
      show={openName === name}
      onHide={close}
      dialogClassName={`md-down modal ${dialogClassName}`}
      aria-labelledby="example-custom-modal-styling-title"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Close>
        <StyledCloseButton as="button" onClick={onClose}>
          <TransparentCircleButton>
            <BsX className="btn--tooltip-close" />
          </TransparentCircleButton>
        </StyledCloseButton>
      </Close>
      {children}
    </BsModal>,
    document.body
  );
}

ModalMenu.Open = Open;
ModalMenu.Close = Close;
ModalMenu.Window = Window;

function useModalContext() {
  const context = useContext(ModalContext);
  if (context === undefined)
    throw new Error('ModalContext was used outside ModalProvier');
  return context;
}

export { ModalMenu, useModalContext };
