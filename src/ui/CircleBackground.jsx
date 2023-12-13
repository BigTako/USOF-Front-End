import styled from 'styled-components';

const CircleBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || '8rem'};
  height: ${(props) => props.width || '8rem'};
  border-radius: 50%;
  background-color: var(--color-grey-200);
  padding: 0.5rem;
`;

export default CircleBackground;
