import { ToggleButton } from 'react-bootstrap';
import styled from 'styled-components';
import { SemiLightGreyPillButton } from './PillButtons';
import {
  PillContainer,
  SemiLightGreyPillContaier,
} from './PillContainers';

const RadioContainer = styled(
  SemiLightGreyPillContaier
)`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props?.columns ?? 1},
    1fr
  );
  column-gap: ${(props) => props?.gap ?? null};
  padding: 0;
`;

function RadioMenuOption({
  value,
  text,
  optionalStyles,
  stateValue,
  setStateValue,
}) {
  return (
    <SemiLightGreyPillButton
      as="button"
      key={value}
      id={`radio-${value}`}
      type="button"
      style={optionalStyles}
      variant={''}
      className={`${
        stateValue === value ? 'active' : ''
      }`}
      name={`radio-${value}`}
      value={value}
      onClick={(e) =>
        setStateValue(e.target.value)
      }
    >
      {text}
    </SemiLightGreyPillButton>
  );
}

export { RadioContainer, RadioMenuOption };
