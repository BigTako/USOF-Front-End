import { Col, Row, Spinner, Stack } from 'react-bootstrap';
import Avatar from './Avatar';
import { useState } from 'react';
import {
  BsArrowDown,
  BsArrowUp,
  BsCheck2Circle,
  BsLock,
  BsPencilSquare,
  BsTrash,
  BsXCircle,
} from 'react-icons/bs';

import styled from 'styled-components';
import CommentEntityForm from '../features/comments/CommentEntityForm';
import {
  useCommentReplies,
  useCreateComment,
  useDeleteComment,
  useUpdateComment,
} from '../features/comments/useComments';
import ReactionButtons from './ReactionButtons';
import {
  DarkGreyPillButton,
  SemiLightGreyPillButton,
  TransparentCircleButton,
  TransparentPillButton,
} from './PillButtons';
import GappedStack from './GappedStack';
import IconSwitcher from './IconSwitcher';
import { ModalMenu, useModalContext } from './ModalMenu';
import Confirm from './Confirm';
import CommentEditForm from '../features/comments/CommentEditForm';
import FullPageSpinner from './FullPageSpinner';

const CommentSidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  gap: 1rem;

  .line {
    width: 0.1rem;
    height: 100%;
    background-color: var(--color-grey-300);
  }
`;

function Comment({ comment, user }) {
  const { close: modalClose } = useModalContext();
  const [openReplies, setOpenReplies] = useState(false);
  const [openReplyForm, setOpenReplyForm] = useState(false);

  const { isCreating: isCreatingComment, createEntity: createComment } =
    useCreateComment();
  const { isUpdating: isUpdatingComment, updateEntity: updateComment } =
    useUpdateComment();
  const { isDeleting, deleteEntity: deleteComment } = useDeleteComment();

  const { isLoading: isLoadingReplies, data: commentReplies } =
    useCommentReplies(comment?.id);

  if (isLoadingReplies) {
    return <FullPageSpinner />;
  }

  const author = comment.authorInfo;
  const isOwn = comment.author === user?.id;

  return (
    <Row style={{ paddingTop: '2rem' }}>
      <Col xs={3} sm={2} md={1}>
        <CommentSidebar>
          <Avatar src={author?.profilePicture} height={'50px'} width={'50px'} />
          <div className="line"></div>
        </CommentSidebar>
      </Col>
      <Col xs={9} sm={10} md={11}>
        <Stack gap={3}>
          <h5>
            <strong>{author?.fullName}</strong>
            {' , '}
            <span>{new Date(comment?.createdAt).toLocaleString()}</span>
            {' , '}
            {comment.status === 'active' && <BsCheck2Circle />}
            {comment.status === 'unactive' && <BsXCircle />}
            {comment.status === 'locked' && <BsLock />}
          </h5>

          <h6>{comment?.content}</h6>

          <Stack direction="horizontal" gap={3} style={{ flexWrap: 'wrap' }}>
            {comment.status === 'locked' ? (
              <BsLock />
            ) : (
              <>
                <ReactionButtons
                  type={'horizontal'}
                  entity={{ ...comment }}
                  entityType={'comment'}
                />
                <TransparentCircleButton
                  as="button"
                  onClick={() => setOpenReplies((v) => !v)}
                >
                  <h3>{openReplies ? <BsArrowUp /> : <BsArrowDown />}</h3>
                </TransparentCircleButton>
              </>
            )}

            {user && comment.status === 'active' && (
              <TransparentPillButton
                style={{ textDecoration: 'underline' }}
                onClick={() => setOpenReplyForm((v) => !v)}
              >
                <strong>reply</strong>
              </TransparentPillButton>
            )}

            {isOwn && (
              <div style={{ marginLeft: 'auto' }}>
                <GappedStack direction="horizontal">
                  <ModalMenu.Open opens={`edit-comment-${comment.id}`}>
                    <SemiLightGreyPillButton as="button">
                      <IconSwitcher icon={<BsPencilSquare />} text={'edit'} />
                    </SemiLightGreyPillButton>
                  </ModalMenu.Open>

                  <ModalMenu.Open
                    opens={`delete-comment-confirm-${comment.id}`}
                  >
                    <DarkGreyPillButton as="button">
                      <IconSwitcher icon={<BsTrash />} text={'delete'} />
                    </DarkGreyPillButton>
                  </ModalMenu.Open>
                </GappedStack>
              </div>
            )}
          </Stack>

          {openReplyForm && (
            <CommentEntityForm
              offset="0rem"
              entityId={comment.id}
              entity="comment"
              onSubmit={(data) => createComment({ ...data, author: user?.id })}
              disabled={isCreatingComment}
              handleSuccess={() => {
                console.log('leaved comment'), setOpenReplyForm(false);
              }}
            />
          )}
          {openReplies &&
            commentReplies.map((reply) => (
              <Comment user={user} key={reply.id} comment={reply} />
            ))}
        </Stack>
      </Col>
      <ModalMenu.Window name={`delete-comment-confirm-${comment.id}`}>
        <Confirm
          title={'Deleting confirmation'}
          text="Are you sure you want to delete this comment permanently? This
              action cannot be undone. All replies will be deleted as well."
          onConfirm={() => deleteComment(comment.id)}
          onCancel={modalClose}
        />
      </ModalMenu.Window>
      <ModalMenu.Window name={`edit-comment-${comment.id}`}>
        <CommentEditForm
          comment={comment}
          onSubmit={(data) => updateComment({ newData: data, id: comment.id })}
          disabled={isUpdatingComment}
        />
      </ModalMenu.Window>
    </Row>
  );
}

export default Comment;
