import { Form } from 'react-bootstrap';
import styled from 'styled-components';

const StyledSelect = styled(Form.Select)`
  background-color: transparent;
  cursor: pointer;
  border: none;
  font-size: inherit;
  &:active {
    outline: none;
  }
`;

export default StyledSelect;
