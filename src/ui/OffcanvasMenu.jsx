import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const StyledOffcanvasMenu = styled.div`
  background-color: var(--color-stone-200);
  gap: 1rem;
`;

const OffcanvasContext = createContext();

function Offcanvas({ children }) {
  const [openId, setOpenId] = useState("");
  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <OffcanvasContext.Provider value={{ openId, open, close }}>
      {children}
    </OffcanvasContext.Provider>
  );
}

function OffcanvasWindow({ id, side = "end", additionalClasses, children }) {
  const { openId, close } = useContext(OffcanvasContext);

  if (id !== openId) {
    return null;
  }

  return createPortal(
    <StyledOffcanvasMenu
      className={`offcanvas offcanvas-${side} ${additionalClasses}`}
      tabIndex="-1"
      id={id}
      aria-labelledby={`${id}Label`}
    >
      {children}
    </StyledOffcanvasMenu>,
    document.body
  );
}

function OffcanvasOpen({ children, opens: openWindowId }) {
  const { openId, open } = useContext(OffcanvasContext);

  if (openId === openWindowId) {
    return null;
  }

  return cloneElement(children, { onClick: () => open(openWindowId) });
}

function OffCanvasClose({ children }) {
  const { close } = useContext(OffcanvasContext);
  return cloneElement(children, { onClick: close });
}

Offcanvas.Open = OffcanvasOpen;
Offcanvas.Close = OffCanvasClose;
Offcanvas.Window = OffcanvasWindow;

export default Offcanvas;
