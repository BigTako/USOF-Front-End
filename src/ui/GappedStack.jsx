import { Stack } from 'react-bootstrap';

function GappedStack({
  children,
  direction = 'vertical',
}) {
  return (
    <Stack
      direction={direction}
      gap={4}
      style={{ minHeight: '100%' }}
    >
      {children}
    </Stack>
  );
}

export default GappedStack;
