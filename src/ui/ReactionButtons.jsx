import { BsChatLeft, BsTriangle, BsTriangleFill } from 'react-icons/bs';
import { useCurrentUser } from '../features/auth/useAuth';
import { useCreateLike, useEntityLikes } from '../features/likes/useLikes';
import GappedStack from './GappedStack';
import IconButton from './IconButton';
import { Link } from 'react-router-dom';
import { formatNumber } from '../utils/utils';
import FullPageSpinner from './FullPageSpinner';

function ReactionButtons({ type, entity, entityType }) {
  const { isCreating: isCreatingLike, createEntity: createLike } =
    useCreateLike(false);

  const { isLoading: isLoadingEntityLikes, data: entityLikes } = useEntityLikes(
    entity.id,
    entityType
  );

  const { isLoading: isLoadingCurrentUser, user: currentUser } =
    useCurrentUser();

  const isLoading = isLoadingEntityLikes || isLoadingCurrentUser;

  if (isLoading) {
    return <FullPageSpinner />;
  }

  const { id, status, likesCount, dislikesCount, commentsCount } = entity || {};

  const isLiked = currentUser
    ? entityLikes?.some(
        (like) =>
          like.entity_id === id &&
          like.type === 'like' &&
          like.author === currentUser.id &&
          like.entity === entityType
      )
    : false;

  const isDisliked = currentUser
    ? entityLikes?.some(
        (like) =>
          like.entity_id === id &&
          like.type === 'dislike' &&
          like.author === currentUser.id &&
          like.entity === entityType
      )
    : false;

  const likeEntity = (type) =>
    currentUser &&
    createLike({
      entity: entityType,
      entity_id: id,
      type,
    });

  return (
    <GappedStack direction={type}>
      <IconButton
        type={type}
        reversed={false}
        icon={isLiked ? <BsTriangleFill /> : <BsTriangle />}
        text={formatNumber(Number(likesCount))}
        onClick={() => likeEntity('like')}
        disabled={isCreatingLike || status === 'locked'}
      />

      <IconButton
        type={type}
        icon={
          isDisliked ? (
            <BsTriangleFill style={{ transform: 'rotate(180deg)' }} />
          ) : (
            <BsTriangle style={{ transform: 'rotate(180deg)' }} />
          )
        }
        reversed={type === 'vertical'}
        text={formatNumber(Number(dislikesCount))}
        onClick={() => likeEntity('dislike')}
        disabled={status === 'locked' || isCreatingLike}
      />
      <IconButton
        type={type}
        reversed={false}
        icon={
          entityType === 'post' ? (
            <Link
              to={`/posts/${id}#comments`}
              style={{ justifyContent: 'center' }}
            >
              <BsChatLeft />
            </Link>
          ) : (
            <BsChatLeft />
          )
        }
        text={commentsCount}
        disabled={status === 'locked'}
      />
    </GappedStack>
  );
}

export default ReactionButtons;
