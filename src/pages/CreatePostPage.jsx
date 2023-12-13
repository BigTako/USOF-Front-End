import { Col, Container, Row, Stack } from 'react-bootstrap';
import styled from 'styled-components';
import PageSection from '../ui/PageSection';

import DarkGreyHeadedContainer from '../ui/DarkGreyHeadedContainer';
import PostForm from '../features/posts/PostForm';
import { useCurrentUser } from '../features/auth/useAuth';
import {
  useCreatePost,
  usePost,
  useUpdatePost,
} from '../features/posts/usePosts';
import FullContainer from '../ui/FullContainer';
import { useParams } from 'react-router-dom';
import FullPageSpinner from '../ui/FullPageSpinner';

const StyledList = styled.ul`
  padding: 0;
  & li {
    padding: 1.6rem;
    border-bottom: 2px solid var(--color-grey-300);
  }

  li:last-child {
    border: none;
  }
`;

function PostCreateForm() {
  const { isLoading: isLoadingCurrentUser, user: currentUser } =
    useCurrentUser();
  const { isCreating, createEntity: createPost } = useCreatePost();

  if (isLoadingCurrentUser) {
    return <FullPageSpinner />;
  }

  return (
    <PostForm
      label={''}
      onSubmit={(data) => createPost({ ...data, author: currentUser.id })}
      disabled={isCreating}
    />
  );
}

function PostEditForm() {
  const { id } = useParams();
  const { isLoading: isLoadingPost, data: post } = usePost(id);
  const { isUpdating, updateEntity: updatePost } = useUpdatePost();

  if (isLoadingPost) {
    return <FullPageSpinner />;
  }

  if (!post) {
    return (
      <FullContainer>
        <h5>No post found</h5>
      </FullContainer>
    );
  }

  return (
    <PostForm
      label={''}
      post={post}
      onSubmit={(data) => updatePost({ newData: data, id: post.id })}
      disabled={isUpdating}
    />
  );
}

function CreatePostPage({ type = 'create' }) {
  return (
    <Container
      style={{
        height: '100vh',
      }}
      fluid="xl"
    >
      <Row
        style={{
          margin: 'var(--page-layout-offset) 0',
        }}
      >
        <Col md={9}>
          <PageSection>
            <Stack>
              <strong>
                <h3>{type === 'create' ? 'Create post' : 'Update post'}</h3>
              </strong>
            </Stack>
          </PageSection>
          <PageSection>
            {type === 'create' && <PostCreateForm />}
            {type === 'update' && <PostEditForm />}
          </PageSection>
        </Col>
        {/* Sidebar */}
        <Col md={3} className="d-none d-md-block">
          <DarkGreyHeadedContainer>
            <StyledList>
              <li>
                <h3>
                  <strong>Rules of posting</strong>
                </h3>
              </li>
              <li>
                <h5>1.Personal info is forbidden.</h5>
              </li>
              <li>
                <h5>2.Write only readable content!</h5>
              </li>
              <li>
                <h5>3.Check originals of content you post.</h5>
              </li>
              <li>
                <h5>4.Devide you text into sections.</h5>
              </li>
              <li>
                <h5>5.Remember, you can format your text!</h5>
              </li>
              <li>
                <h5>6.Smile :)</h5>
              </li>
            </StyledList>
          </DarkGreyHeadedContainer>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePostPage;
