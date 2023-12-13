import { Stack } from 'react-bootstrap';
import { WhitePillContaier } from './PillContainers';
import styled from 'styled-components';
import StyledSelect from './StyledSelect';

function IconSelect({ icon, value, setValue, children }) {
  return (
    <WhitePillContaier style={{ padding: '0.5rem' }}>
      <Stack direction="horizontal">
        <h2>{icon}</h2>
        <StyledSelect
          value={value}
          style={{
            fontWeight: 'bold',
          }}
          onChange={(e) => setValue(e.target.value)}
        >
          {children}
          {/* {options.map((option, i) => (
            <option selected={option === value} key={i} value={option}>
              {option}
            </option>
          ))} */}
        </StyledSelect>
      </Stack>
    </WhitePillContaier>
  );
}
export default IconSelect;
