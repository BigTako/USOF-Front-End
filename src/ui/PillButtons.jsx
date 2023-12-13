import styled from 'styled-components';
import {
  DarkGreyPillContaier,
  LightGreyPillContaier,
  PillContainer,
  SemiLightGreyPillContaier,
} from './PillContainers';

export const TransparentCircleButton = styled(PillContainer)`
  background-color: transparent;
  width: ${(props) => props?.width || '4rem'};
  height: ${(props) => props?.height || '4rem'};
  &:hover {
    background-color: var(--color-grey-100);
  }
`;

export const DarkGreyPillButton = styled(DarkGreyPillContaier)`
  &,
  &:active {
    background-color: var(--color-grey-950);
    color: var(--color-grey-0);
  }

  &:hover {
    background-color: var(--color-grey-800);
    // color: var(--color-grey-0);
  }
`;

export const SemiLightGreyPillButton = styled(SemiLightGreyPillContaier)`
  &,
  &:active {
    background-color: var(--color-grey-200);
    color: var(--color-grey-950);
  }

  &:hover {
    background-color: var(--color-grey-300);
    // color: var(--color-grey-0);
  }
  &.active {
    background-color: var(--color-grey-950);
    color: var(--color-grey-0);
  }

  &.active {
    background-color: var(--color-grey-950);
    // color: var(--color-grey-0);
  }
`;

export const SemiLightGreyTagButton = styled(SemiLightGreyPillButton)`
  padding: 0.8rem 1.2rem;
`;

export const LightGreyPillButton = styled(LightGreyPillContaier)`
  &,
  &:active {
    background-color: var(--color-grey-100);
    color: var(--color-grey-950);
  }

  &:hover {
    background-color: var(--color-grey-200);
    // color: var(--color-grey-0);
  }
`;

export const TransparentPillButton = styled(PillContainer)`
  color: var(--color-grey-950);
  background-color: transparent;
  cursor: pointer;
`;
