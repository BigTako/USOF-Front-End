import { Col, Container, Row, Stack } from 'react-bootstrap';
import GappedStack from './GappedStack';
import IconButton from './IconButton';
import {
  BsCheck2Circle,
  BsLock,
  BsPencilSquare,
  BsTrash,
  BsXCircle,
} from 'react-icons/bs';
import Avatar from './Avatar';
import TagsContainer from './TagsContainer';
import { DarkGreyPillContaier } from './PillContainers';
import { DarkGreyPillButton, SemiLightGreyPillButton } from './PillButtons';
import IconSwitcher from './IconSwitcher';
import { Link } from 'react-router-dom';
import { ModalMenu, useModalContext } from './ModalMenu';
import Confirm from './Confirm';
import { useDeletePost } from '../features/posts/usePosts';

import ReactionButtons from './ReactionButtons';
import TextTruncator from './TextTruncator';

function PostPreviewHeader({ author, createdAt, status }) {
  return (
    <header>
      <GappedStack direction="horizontal">
        <Avatar
          className="rounded--shadow"
          src={author.profilePicture}
          height={'50px'}
          width={'50px'}
        />
        <h5 style={{ width: '100%' }}>
          <Stack
            gap={2}
            direction="horizontal"
            style={{ alignItems: 'center', flexWrap: 'wrap' }}
          >
            <h4>
              <strong>{author.fullName}</strong>
            </h4>
            <span>posted at</span>
            <span>{new Date(createdAt).toLocaleString()}</span>
          </Stack>
        </h5>

        <h3>
          {status === 'active' && <BsCheck2Circle />}
          {status === 'unactive' && <BsXCircle />}
          {status === 'locked' && <BsLock />}
        </h3>
      </GappedStack>
    </header>
  );
}

function PostPreviewBody({ id, title, content, maxLen, categoriesPopulated }) {
  return (
    <main>
      <GappedStack>
        <Link to={`/posts/${id}`}>
          <h3>
            <strong>{title}</strong>
          </h3>
        </Link>
        <h5>
          {maxLen && content ? (
            <Link to={`/posts/${id}`}>
              <TextTruncator maxLen={maxLen}>{content}</TextTruncator>
            </Link>
          ) : (
            content
          )}
        </h5>
        {/* section with post categories listened */}
        <section style={{ marginTop: 'auto' }}>
          <TagsContainer maxHeight="9rem">
            {categoriesPopulated?.map((category) => (
              <DarkGreyPillContaier
                as="button"
                key={category.id}
                style={{
                  padding: '0.8rem 1.2rem',
                }}
                // onClick={() => toggleCategory(category.id)}
              >
                {category.title}
              </DarkGreyPillContaier>
            ))}
          </TagsContainer>
        </section>
      </GappedStack>
    </main>
  );
}

function PostPreviewFooter({ sideBarAttach, isUserPost, post }) {
  const { id, status, likesCount, dislikesCount, commentsCount } = post || {};

  return (
    <footer
      style={{
        padding: '0.8rem 0',
        borderTop:
          sideBarAttach === 'left' ? '' : '0.2rem solid var(--color-grey-300)',
        borderBottom: `${
          sideBarAttach === 'left' ? '' : '0.2rem solid var(--color-grey-300)'
        }`,
      }}
    >
      <Stack
        direction="horizontal"
        style={{
          // justifyContent: '',
          flexWrap: 'wrap',
        }}
      >
        <div
          className={`${sideBarAttach === 'left' ? 'd-flex d-md-none' : ''}`}
        >
          {status === 'locked' ? (
            <Stack
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <h2>
                <BsLock />
              </h2>
            </Stack>
          ) : (
            <ReactionButtons
              type={'horizontal'}
              entityType={'post'}
              entity={{
                id,
                status,
                likesCount,
                dislikesCount,
                commentsCount,
              }}
            />
          )}
        </div>
        {isUserPost && (
          <div style={{ marginLeft: 'auto' }}>
            <GappedStack direction="horizontal">
              <Link to={`/posts/update/${id}`}>
                <SemiLightGreyPillButton as="button">
                  <IconSwitcher icon={<BsPencilSquare />} text={'edit'} />
                </SemiLightGreyPillButton>
              </Link>
              <ModalMenu.Open opens={`delete-confirm-${id}`}>
                <DarkGreyPillButton as="button">
                  <IconSwitcher icon={<BsTrash />} text={'delete'} />
                </DarkGreyPillButton>
              </ModalMenu.Open>
            </GappedStack>
          </div>
        )}
      </Stack>
    </footer>
  );
}

function PostPreview({
  post,
  categories,
  isUserPost,
  sideBarAttach = 'bottom',
  maxContentLen,
  children,
}) {
  const {
    id,
    title,
    content,
    categories: postCategories,
    createdAt,
    status,
    likesCount,
    dislikesCount,
    commentsCount,
  } = post || {};

  const author = post?.authorInfo;

  const { close: modalClose } = useModalContext();

  const { isDeleteting, deleteEntity: deletePost } = useDeletePost();
  // const { isLoading: isLoadingPostLikes, likes: postLikes } = usePostLikes(id);

  const categoriesPopulated = categories.filter((category) =>
    postCategories.includes(category.id)
  );

  return (
    <Container fluid>
      <Row>
        {sideBarAttach === 'left' && (
          <Col
            md={2}
            xl={1}
            className="d-none d-md-flex"
            style={{
              borderRight: '0.2rem solid var(--color-grey-300)',
            }}
          >
            {status === 'locked' ? (
              <Stack style={{ justifyContent: 'center', alignItems: 'center' }}>
                <h2>
                  <BsLock />
                </h2>
              </Stack>
            ) : (
              post && (
                <ReactionButtons
                  type={'vertical'}
                  entityType={'post'}
                  entity={{
                    id,
                    status,
                    likesCount,
                    dislikesCount,
                    commentsCount,
                  }}
                />
              )
            )}
          </Col>
        )}
        <Col
          md={sideBarAttach === 'left' ? 10 : 12}
          xl={sideBarAttach === 'left' ? 11 : 12}
          style={{ padding: '0 1.6rem' }}
        >
          {/* Post body */}
          <GappedStack>
            {/* header with avatar and user info */}
            <PostPreviewHeader
              author={author}
              createdAt={createdAt}
              status={status}
            />

            {/* body with title and content*/}
            <PostPreviewBody
              id={id}
              title={title}
              content={content}
              maxLen={maxContentLen}
              categoriesPopulated={categoriesPopulated}
            />

            {/* footer with menu and edit buttons if its users post */}
            <PostPreviewFooter
              sideBarAttach={sideBarAttach}
              isUserPost={isUserPost}
              post={{
                id,
                status,
                likesCount,
                dislikesCount,
                commentsCount,
              }}
            />
            {status !== 'locked' && <>{children}</>}
          </GappedStack>
        </Col>
      </Row>
      <ModalMenu.Window name={`delete-confirm-${post.id}`}>
        <Confirm
          title={'Deleting confirmation'}
          text="Are you sure you want to delete this information permanently? This
              action cannot be undone."
          onConfirm={() => deletePost(post.id)}
          onCancel={modalClose}
        />
      </ModalMenu.Window>
    </Container>
  );
}

export default PostPreview;
