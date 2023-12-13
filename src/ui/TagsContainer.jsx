import styled from 'styled-components';

const TagsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  min-width: 100%;
  max-height: ${(props) => props?.maxHeight};
  overflow-y: auto;
  gap: 0.8rem;
  font-size: 1.2rem;
`;

export default TagsContainer;
