import styled from 'styled-components';
import { TransparentPillButton } from './PillButtons';

const StyledSelectNavbarButton = styled(TransparentPillButton)`
  display: flex;
  align-items: center;
  min-height: inherit;
  border-radius: 0;
  font-size: 1.4rem;
  text-transform: uppercase;
  &:hover,
  &.active {
    box-shadow: inset 0 -2px 0 0 rgba(0, 0, 0, 0.875);
  }
`;

function SelectNavbarButton({ buttonValue, buttonTitle, value, setValue }) {
  return (
    <StyledSelectNavbarButton
      className={`${value === buttonValue && 'active'}`}
      onClick={() => setValue(buttonValue)}
    >
      {buttonTitle}
    </StyledSelectNavbarButton>
  );
}

export default SelectNavbarButton;
