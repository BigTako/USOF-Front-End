import { Col, Container, Row } from 'react-bootstrap';
import UserProfileSection from '../ui/UserProfileSection';
import PageSection from '../ui/PageSection';

import { usePost } from '../features/posts/usePosts';
import { useCategories } from '../features/categories/useCategories';
import PostPreview from '../ui/PostPreview';
import { useCurrentUser } from '../features/auth/useAuth';
import Post from '../features/posts/Post';
import { useParams } from 'react-router-dom';
import FullPageSpinner from '../ui/FullPageSpinner';

function PostPage() {
  // const post = tempPosts.find((post) => post.id === Number(id));
  const { id } = useParams();

  const { isLoadingPost, error, data: post } = usePost(id);

  const { isLoading: isLoadingCategories, data: categories } = useCategories();

  const { isLoading: isLoadingCurrentUser, user: currentUser } =
    useCurrentUser();

  const isLoading =
    isLoadingPost ||
    isLoadingCategories ||
    isLoadingCurrentUser ||
    !post ||
    !categories;

  if (isLoading) {
    return <FullPageSpinner />;
  } else if (error) {
    return <div>{error}</div>;
  }

  const isUserPost = !currentUser ? false : post?.author === currentUser?.id;

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
          <PageSection key={post?.id}>
            <PostPreview
              post={post}
              categories={categories}
              isUserPost={isUserPost}
              sideBarAttach="bottom"
            >
              <Post user={currentUser} post={post} />
            </PostPreview>
          </PageSection>
        </Col>
        {/* Sidebar */}
        <Col md={3} className="d-none d-md-block">
          <UserProfileSection user={post.authorInfo} />
        </Col>
      </Row>
    </Container>
  );
}

export default PostPage;
