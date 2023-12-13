import FullContainer from '../../ui/FullContainer';
import IconSelect from '../../ui/IconSelect';
import { BsSortDown } from 'react-icons/bs';
import Comment from '../../ui/Comment';
import CommentEntityForm from '../comments/CommentEntityForm';
import { SemiLightGreyPillButton } from '../../ui/PillButtons';
import { useEffect, useState } from 'react';
import { useCreateComment, usePostComments } from '../comments/useComments';
import { useCommentsSelector } from '../../contexts/CommentsSelectContext';
import { useParams } from 'react-router-dom';
import { Container, Stack } from 'react-bootstrap';
import FullPageSpinner from '../../ui/FullPageSpinner';

function Post({ post, user }) {
  const [showComments, setShowComments] = useState(false);

  const [sortBy, setSortBy] = useState('newestFirst');

  const {
    sort,
    order,
    fields,
    limit,
    page,
    setStatus,
    newestFirst,
    oldestFirst,
    popularFirst,
    unpopularFirst,
  } = useCommentsSelector();

  useEffect(() => {
    setStatus('active');
  }, []);

  useEffect(() => {
    function switchSortBy() {
      switch (sortBy) {
        case 'newestFirst':
          newestFirst();
          break;
        case 'oldestFirst':
          oldestFirst();
          break;
        case 'popularFirst':
          popularFirst();
          break;
        case 'unpopularFirst':
          unpopularFirst();
          break;
        default:
          break;
      }
    }
    switchSortBy();
  }, [sortBy]);
  const { id } = useParams();

  const { isLoading: isLoadingPostComments, data: postComments } =
    usePostComments(id, {
      fields,
      sort,
      order,
      limit,
      page,
    });

  const { isCreating: isCreatingComment, createEntity: createComment } =
    useCreateComment();

  if (isLoadingPostComments || !postComments || !post) {
    return <FullPageSpinner />;
  }

  return (
    <>
      {user && (
        <CommentEntityForm
          label="Have an answer?"
          entityId={post.id}
          entity="post"
          offset="1rem 0rem"
          onSubmit={(data) => createComment({ ...data, author: user?.id })}
          disabled={isCreatingComment}
        />
      )}

      <Container fluid="md">
        {!postComments?.length && (
          <FullContainer>
            <h5>No comments yet</h5>
          </FullContainer>
        )}
        {postComments?.length ? (
          <>
            <Stack direction="horizontal">
              <IconSelect
                value={sortBy}
                setValue={setSortBy}
                icon={<BsSortDown />}
              >
                <option value="newestFirst">Newest first</option>
                <option value="oldestFirst">Oldest first</option>
                <option value="popularFirst">Popular first</option>
                <option value="unpopularFirst">Unpopular first</option>
              </IconSelect>

              <SemiLightGreyPillButton
                as="button"
                onClick={() => setShowComments((v) => !v)}
              >
                {showComments ? 'Hide' : 'Show'}
              </SemiLightGreyPillButton>
            </Stack>
            {showComments &&
              postComments?.map((comment) => (
                <Comment key={comment.id} comment={comment} user={user} />
              ))}
          </>
        ) : null}
      </Container>
    </>
  );
}

export default Post;
