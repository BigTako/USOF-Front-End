import { Spinner } from 'react-bootstrap';
import FullContainer from './FullContainer';

function FullPageContainer() {
  return (
    <FullContainer style={{ position: 'absolute' }}>
      <Spinner animation="border" size="lg" />
    </FullContainer>
  );
}

export default FullPageContainer;
