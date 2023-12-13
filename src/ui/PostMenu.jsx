import { BsChatLeft, BsHandThumbsDown, BsHandThumbsUp } from 'react-icons/bs';
import GappedStack from './GappedStack';
import IconButton from './IconButton';

function PostMenu({ type, buttons }) {
  return (
    <GappedStack direction={type}>
      {buttons.map((button, i) => (
        <IconButton
          key={i}
          type={type}
          reversed={button?.reversed}
          icon={button?.icon}
          text={button?.text}
          onClick={button?.onClick}
          disabled={button?.disabled}
        />
      ))}
    </GappedStack>
  );
}

export default PostMenu;
