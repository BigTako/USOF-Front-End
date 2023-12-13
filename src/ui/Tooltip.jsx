import styled from 'styled-components';
import { useContext, createContext, useState, cloneElement } from 'react';
import { Overlay } from 'react-bootstrap';
import { createPortal } from 'react-dom';
// import {
//   Button,
//   ModalMenu as BsModal,
// } from 'react-bootstrap';
// import { createPortal } from 'react-dom';
// import StyledCircleButton from './StyledCircleButton';

const TooltipContext = createContext();

function Tooltip({ children }) {
  const [openName, setOpenName] = useState('');
  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <TooltipContext.Provider value={{ openName, close, open }}>
      {children}
    </TooltipContext.Provider>
  );
}

// const StyledCloseButton = styled(
//   StyledCircleButton
// )`
//   position: absolute;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   width: 4.4rem;
//   height: 4.4rem;
//   font-size: 4rem;
//   color: var(--color-stone-500);

//   margin: 0.5rem 1rem;
// `;

function Open({ children, opens: opensTooltipName }) {
  const { open, openName, close } = useContext(TooltipContext);
  return cloneElement(children, {
    onClick: () => (openName === '' ? open(opensTooltipName) : close()),
  });
}

function Close({ children }) {
  const { close } = useContext(TooltipContext);
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

function Window({
  children,
  name,
  target,
  placement,
  styles,
  dialogClassName,
}) {
  const { openName, close } = useContext(TooltipContext);

  if (name !== openName) {
    return null;
  }
  return createPortal(
    <Overlay
      target={target.current}
      show={openName === name}
      placement={placement}
    >
      {({
        placement: _placement,
        arrowProps: _arrowProps,
        show: _show,
        popper: _popper,
        hasDoneInitialMeasure: _hasDoneInitialMeasure,
        ...props
      }) => (
        <div
          {...props}
          style={{
            ...styles,
            ...props.style,
          }}
        >
          {children}
        </div>
      )}
    </Overlay>,
    document.body
  );
}

function useTooltipContext() {
  const context = useContext(TooltipContext);
  if (context === undefined)
    throw new Error('TooltipContext was used outside TooltipProvider');
  return context;
}

Tooltip.Open = Open;
Tooltip.Window = Window;
Tooltip.Close = Close;

export { Tooltip, useTooltipContext };
