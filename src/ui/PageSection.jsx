import { WhitePillContaier } from './PillContainers';

function PageSection({ children }) {
  return (
    <WhitePillContaier
      className="rounded--shadow"
      style={{
        marginBottom: 'var(--container-offset)',
        padding: 'var(--container-padding)',
      }}
    >
      {children}
    </WhitePillContaier>
  );
}

export default PageSection;
