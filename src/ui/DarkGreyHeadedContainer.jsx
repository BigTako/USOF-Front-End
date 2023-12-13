import { Stack } from 'react-bootstrap';
import {
  DarkGreyPillContaier,
  WhitePillContaier,
} from './PillContainers';

function DarkGreyHeadedContainer({
  children,
  containerStyles,
}) {
  return (
    <Stack
      direction="vertical"
      className="rounded--shadow"
      style={{
        ...containerStyles,
        borderRadius:
          'var(--button-border-radius)',
      }}
    >
      <DarkGreyPillContaier
        style={{
          minHeight: '6rem',
          borderTopLeftRadius:
            'var(--button-border-radius)',
          borderTopRightRadius:
            'var(--button-border-radius)',
          borderBottomRightRadius: '0px',
          borderBottomLeftRadius: '0px',
        }}
      />
      <WhitePillContaier
        style={{
          position: 'relative',
          minHeight: '6rem',
          borderTopLeftRadius: '0px',
          borderTopRightRadius: '0px',
          borderBottomRightRadius:
            'var(--button-border-radius)',
          borderBottomLeftRadius:
            'var(--button-border-radius)',
        }}
      >
        {children}
      </WhitePillContaier>
    </Stack>
  );
}

export default DarkGreyHeadedContainer;
