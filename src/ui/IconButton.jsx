import { Stack } from 'react-bootstrap';
import { TransparentPillButton } from './PillButtons';

function IconButton({ icon, text, type, reversed, onClick, disabled }) {
  return (
    <TransparentPillButton onClick={onClick} style={{ fontSize: '1.6rem' }}>
      <Stack
        direction={type}
        gap={2}
        style={{
          justifyContent: 'flex-start',
          flexDirection: `${
            reversed
              ? `${type === 'horizontal' ? 'row' : 'column'}-reverse`
              : ''
          }`,
        }}
      >
        <TransparentPillButton as={'button'} disabled={disabled}>
          {/* <h4 className="text-center"></h4> */}
          {icon}
        </TransparentPillButton>
        <TransparentPillButton as="button" disabled={disabled}>
          {/* <h6></h6> */}
          {text}
        </TransparentPillButton>
      </Stack>
    </TransparentPillButton>
  );
}

export default IconButton;
