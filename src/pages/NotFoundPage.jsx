import { Stack } from 'react-bootstrap';
import FullContainer from '../ui/FullContainer';
import { BsEmojiFrown } from 'react-icons/bs';
import styled from 'styled-components';

const FullPageContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function NotFoundPage() {
  return (
    <FullPageContainer style={{ flexDirection: 'column', gap: '1rem' }}>
      <BsEmojiFrown style={{ fontSize: '8rem' }} />
      <h1>Ooops...Page not found</h1>
    </FullPageContainer>
  );
}

export default NotFoundPage;
