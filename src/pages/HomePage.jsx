import { DarkGreyPillButton } from '../ui/PillButtons';

import PageSection from '../ui/PageSection';
import { useEffect } from 'react';
import DarkGreyHeadedContainer from '../ui/DarkGreyHeadedContainer';
import GappedStack from '../ui/GappedStack';
import CategorySearch from '../ui/CategorySearch';
import PostsSortMenu from '../ui/PostsSortMenu';
import { Col, Container, Row, Stack } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { usePostsSelector } from '../contexts/PostsSelectContext';
import { usePosts } from '../features/posts/usePosts';
import { useCategories } from '../features/categories/useCategories';
import PostsWall from '../features/posts/PostsWall';
import FullPageSpinner from '../ui/FullPageSpinner';

function PageFooter() {
  return (
    <GappedStack direction="vertical">
      <Container
        style={{
          padding: '1.6rem',
          fontSize: '1.2rem',
          borderBottom: '0.2rem solid var(--color-grey-300)',
        }}
      >
        <Row>
          <Col>
            <Stack direction="vertical" gap={3}>
              <div>Content Policy</div>
              <div>Moderator Code of product</div>
              <div>Content Policy</div>
            </Stack>
          </Col>
          <Col>
            <Stack direction="vertical" gap={3}>
              <div>Content Policy</div>
              <div>Moderator Code of product</div>
              <div>Content Policy</div>
            </Stack>
          </Col>
        </Row>
      </Container>

      <h5
        style={{
          padding: '0 1.6rem',
        }}
      >
        DoorIs,inc. &copy; {new Date().getFullYear()}. All rights are reserved.
      </h5>
    </GappedStack>
  );
}

function HomepageSidebar({ categories }) {
  const { fields, setCategories } = usePostsSelector();

  return (
    <>
      <DarkGreyHeadedContainer
        containerStyles={{
          marginBottom: 'var(--container-offset)',
        }}
      >
        <Stack
          gap={4}
          style={{
            padding: 'var(--container-padding)',
          }}
        >
          <h3>
            <strong>Home</strong>
          </h3>
          <div>
            Only one who searchs, will find an answer. Our door are always
            opened for everyone!
          </div>
          <Link to="/posts/create">
            <DarkGreyPillButton as="button">Create post</DarkGreyPillButton>
          </Link>
        </Stack>
      </DarkGreyHeadedContainer>
      <PageSection>
        <CategorySearch
          values={fields?.['categories[cont]'] || []}
          onSelectValue={setCategories}
          categories={categories}
        />
      </PageSection>
      <PageSection>
        <PageFooter />
      </PageSection>
    </>
  );
}

function HomePage() {
  const { setStatus } = usePostsSelector();

  useEffect(() => {
    setStatus('active');
  }, []);

  const {
    isLoading: isLoadingCategories,
    error: categoriesLoadingError,
    data: categories,
  } = useCategories();

  const isLoading = isLoadingCategories || !categories;

  const error = categoriesLoadingError;

  if (isLoading) {
    return <FullPageSpinner />;
  } else if (error) {
    return <div>{error}</div>;
  }

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
            <PostsSortMenu />
          </PageSection>

          <PostsWall
            categories={categories}
            loadPosts={usePosts}
            sideBarAttach="left"
            isUserPosts={false}
          />
        </Col>
        {/* Sidebar */}
        <Col md={3} className="d-none d-md-block">
          <HomepageSidebar categories={categories} />
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
