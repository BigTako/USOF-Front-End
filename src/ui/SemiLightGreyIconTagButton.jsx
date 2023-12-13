import { Stack } from 'react-bootstrap';
import { SemiLightGreyPillButton } from './PillButtons';

function SemiLightGreyIconTagButton({ icon, text, onClick }) {
  return (
    <SemiLightGreyPillButton
      as="button"
      style={{
        padding: '0.8rem 1.6rem',
      }}
      onClick={onClick}
    >
      <Stack direction="horizontal" gap={2}>
        {icon}
        {text}
      </Stack>
    </SemiLightGreyPillButton>
  );
}

export default SemiLightGreyIconTagButton;
