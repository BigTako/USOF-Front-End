import { useEffect, useRef } from 'react';
import { Tooltip, useTooltipContext } from './Tooltip';

import styled from 'styled-components';
import { TransparentCircleButton } from './PillButtons';

import { Stack } from 'react-bootstrap';
import { DarkGreyPillButton, SemiLightGreyPillButton } from './PillButtons';
import { BsPencil, BsThreeDotsVertical, BsTrash, BsX } from 'react-icons/bs';
import { ModalMenu } from './ModalMenu';
import StyledTooltipButton from './StyledTooltipButton';
import IconButton from './IconButton';
import Confirm from './Confirm';

const StyledTable = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props?.cells}, 1fr);
  overflow-y: scroll;
  max-height: 80vh;
  text-align: center;
  border-collapse: collapse;
  background-color: var(--color-grey-200);
  row-gap: 0.2rem;
  font-size: 1.4rem;
  padding: 0;

  & > * {
    background-color: var(--table-body-color);
    color: var(--table-font-color);
    border: none;
    text-align: center;
  }

  .table-header-cell {
    background-color: var(--table-header-color);
    color: var(--table-header-font-color);
  }

  & > div {
    /* border: none; */
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.2rem;
  }

  & img {
    cursor: pointer;
    border: none;
    max-height: 3rem;
    max-width: 3rem;
    justify-self: center;
  }

  & img:hover {
    transform: scale(2);
  }
`;

export function TableRow({ entityId, onDelete, children }) {
  const target = useRef(null);
  const { close: closeTooltips } = useTooltipContext();
  return (
    <>
      {children}
      <div>
        <Tooltip.Open opens={`tooltip-${entityId}`}>
          <TransparentCircleButton as="button" ref={target}>
            <h2>
              <BsThreeDotsVertical />
            </h2>
          </TransparentCircleButton>
        </Tooltip.Open>
      </div>
      <Tooltip.Window
        name={`tooltip-${entityId}`}
        target={target}
        placement="right"
        styles={{
          position: 'absolute',
          backgroundColor: 'var(--color-grey-0)',
          boxShadow: '0 0 10px 0 rgb(0, 0, 0, 0.3)',
          borderRadius: 'var(--general-border-radius)',
          marginTop: '1.2rem',
        }}
      >
        <ModalMenu.Open opens={`edit-${entityId}`}>
          <StyledTooltipButton variant="">
            <IconButton type={'horizontal'} icon={<BsPencil />} text={'Edit'} />
          </StyledTooltipButton>
        </ModalMenu.Open>
        <ModalMenu.Open opens={`delete-confirm-${entityId}`}>
          <StyledTooltipButton variant="">
            <IconButton
              type={'horizontal'}
              icon={<BsTrash />}
              text={'Delete'}
            />
          </StyledTooltipButton>
        </ModalMenu.Open>
      </Tooltip.Window>

      <ModalMenu.Window
        name={`delete-confirm-${entityId}`}
        onClose={closeTooltips}
      >
        <Confirm
          title={'Deleting confirmation'}
          text="Are you sure you want to delete this information permanently? This
              action cannot be undone."
          onConfirm={onDelete}
          onCancel={closeTooltips}
        />
      </ModalMenu.Window>
    </>
  );
}

export function Table({ tableId, headers, cells, children }) {
  const { close } = useTooltipContext();
  useEffect(
    function () {
      document.getElementById(tableId).addEventListener('scroll', close);
    },
    [tableId, close]
  );

  return (
    <>
      <StyledTable cells={cells} id={tableId}>
        {headers?.map((header) => (
          <div key={header} className="table-header-cell">
            {header}
          </div>
        ))}
        {children}
      </StyledTable>
    </>
  );
}
