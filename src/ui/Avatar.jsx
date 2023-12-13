import styled from 'styled-components';

const Avatar = styled.img`
  display: block;
  max-width: ${(props) => props?.width || '4rem'};
  max-height: ${(props) => props?.height || '4rem'};
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  /* margin: '0.4rem'; */
  /* outline: 2px solid var(--color-grey-100); */
`;

export default Avatar;
