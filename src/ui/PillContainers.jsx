import styled from 'styled-components';

export const PillContainer = styled.div`
  border: none;
  border-radius: var(--button-border-radius);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.2s ease-in-out;
`;

export const TransparentPillContainer = styled(PillContainer)`
  box-shadow: none;
  background-color: transparent;
  padding: 0.8rem 1.2rem;
`;

export const DarkGreyPillContaier = styled(PillContainer)`
  background-color: var(--color-grey-950);
  color: var(--color-grey-0);

  padding: 0.8rem 1.2rem;
`;

export const SemiLightGreyPillContaier = styled(PillContainer)`
  background-color: var(--color-grey-200);
  color: var(--color-grey-950);

  padding: 0.8rem 1.2rem;
`;

export const LightGreyPillContaier = styled(PillContainer)`
  background-color: var(--color-grey-100);
  color: var(--color-grey-950);

  padding: 0.8rem 1.2rem;
`;

export const WhitePillContaier = styled(PillContainer)`
  background-color: var(--color-grey-0);
  color: var(--color-grey-950);
`;
