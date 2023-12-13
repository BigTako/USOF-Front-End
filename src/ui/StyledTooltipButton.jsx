import styled from 'styled-components';
import { TransparentPillButton } from './PillButtons';

const StyledTooltipButton = styled(
  TransparentPillButton
)`
  border-radius: 0;
  display: flex;
  justify-content: flex-start;
  padding: 0.8rem 1.6rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  &:active {
    background-color: var(--color-grey-200);
    border: none;
    outline: none;
  }
`;

export default StyledTooltipButton;
