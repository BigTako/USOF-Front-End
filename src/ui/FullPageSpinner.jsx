import { Spinner } from 'react-bootstrap';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

const FullPageContainer = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(2px);
`;

function FullPageSpinner() {
  return createPortal(
    <FullPageContainer>
      <Spinner />
    </FullPageContainer>,
    document.getElementById('root')
  );
}

export default FullPageSpinner;
