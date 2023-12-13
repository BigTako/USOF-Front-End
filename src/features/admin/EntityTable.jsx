import { BsLock, BsPlusCircle } from 'react-icons/bs';
import {
  DarkGreyPillButton,
  SemiLightGreyPillButton,
} from '../../ui/PillButtons';
import { Link } from 'react-router-dom';
import { Table, TableRow } from '../../ui/Table';
import { ModalMenu } from '../../ui/ModalMenu';
import { useTooltipContext } from '../../ui/Tooltip';
import FullContainer from '../../ui/FullContainer';
import TextTruncator from '../../ui/TextTruncator';

export function LimitedText({ words = 5, children }) {
  return (
    <>
      {children ? (
        <TextTruncator maxLen={words * 5}>{children}</TextTruncator>
      ) : (
        '-'
      )}
    </>
  );
}

export function BooleanView({ value }) {
  return (
    <>
      {value ? (
        <DarkGreyPillButton>yes</DarkGreyPillButton>
      ) : (
        <SemiLightGreyPillButton>no</SemiLightGreyPillButton>
      )}
    </>
  );
}

export function StatusView({ status }) {
  return (
    <>
      {status === 'active' && <DarkGreyPillButton>active</DarkGreyPillButton>}
      {status === 'unactive' && (
        <SemiLightGreyPillButton>unactive</SemiLightGreyPillButton>
      )}
      {status === 'locked' && <BsLock />}
    </>
  );
}

export function EntityView({ entity, id }) {
  return (
    <>
      {entity === 'post' && <Link to={`/posts/${id}`}>Post with ID {id}</Link>}
      {entity === 'comment' && `Comment with ID ${id}`}
    </>
  );
}

export function OpenModalFormButton({ formName }) {
  return (
    <ModalMenu.Open opens={formName}>
      <SemiLightGreyPillButton as="button">
        <h5>
          <BsPlusCircle />
        </h5>
      </SemiLightGreyPillButton>
    </ModalMenu.Open>
  );
}

export function FormModal({ name, children }) {
  const { close } = useTooltipContext();
  return (
    <ModalMenu.Window name={name} onClose={close}>
      {children}
    </ModalMenu.Window>
  );
}

export function EntityTable({
  entityName,
  entities,
  headers,
  render,
  onDelete,
}) {
  return (
    <>
      {entities.length === 0 ? (
        <FullContainer>
          <h4>Set of entities is empty</h4>
        </FullContainer>
      ) : (
        <Table
          tableId={`table--${entityName}s`}
          cells={headers.length}
          headers={headers}
        >
          {entities.map((entity) => (
            <TableRow
              key={entity.id}
              entityId={`${entityName}-${entity.id}`}
              onDelete={() => onDelete(entity.id)}
            >
              {render(entity)}
            </TableRow>
          ))}
        </Table>
      )}
    </>
  );
}
