import { Container, Stack } from 'react-bootstrap';
import styled from 'styled-components';
import StyledNavBar from './StyledNavBar';

const StyledSelectNavBar = styled(StyledNavBar)`
  border-top: 2px solid var(--color-grey-200);
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

function SelectNavbar({ children }) {
  return (
    <StyledSelectNavBar>
      <Container
        fluid="xl"
        style={{
          minHeight: 'inherit',
          overflowX: 'auto',
        }}
      >
        <Stack direction="horizontal" gap={5} style={{ minHeight: 'inherit' }}>
          {children}
        </Stack>
      </Container>
    </StyledSelectNavBar>
  );
}

export default SelectNavbar;
