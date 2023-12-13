import { Stack } from 'react-bootstrap';
import { ModalMenu } from './ModalMenu';
import { DarkGreyPillButton, SemiLightGreyPillButton } from './PillButtons';

function Confirm({ title, text, onConfirm, onCancel }) {
  return (
    <div style={{ padding: '2rem 1rem' }}>
      <Stack gap={3}>
        <h3>
          <strong>{title}</strong>
        </h3>
        <p>{text}</p>
        <Stack
          direction="horizontal"
          gap={3}
          style={{ justifyContent: 'flex-end' }}
        >
          <ModalMenu.Close>
            <SemiLightGreyPillButton as="button" onClick={onCancel}>
              Cancel
            </SemiLightGreyPillButton>
          </ModalMenu.Close>
          <DarkGreyPillButton as="button" onClick={onConfirm}>
            Delete
          </DarkGreyPillButton>
        </Stack>
      </Stack>
    </div>
  );
}

export default Confirm;
