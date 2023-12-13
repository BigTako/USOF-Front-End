import styled from 'styled-components';

const StyledConfirmWindow = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmWindow({ children }) {
  return <StyledConfirmWindow>{children}</StyledConfirmWindow>;
}

export default ConfirmWindow;
