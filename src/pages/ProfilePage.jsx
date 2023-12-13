import CategorySearch from '../ui/CategorySearch';
import PageSection from '../ui/PageSection';

import UserProfileSection from '../ui/UserProfileSection';
import PostsSortMenu from '../ui/PostsSortMenu';

import SelectNavbar from '../ui/SelectNavbar';
import SelectNavbarButton from '../ui/SelectNavbarButton';
import { Col, Container, Row } from 'react-bootstrap';
import { useCurrentUser } from '../features/auth/useAuth';
import { useCategories } from '../features/categories/useCategories';
import { useCurrentUserPosts } from '../features/posts/usePosts';
import { usePostsSelector } from '../contexts/PostsSelectContext';
import PostsWall from '../features/posts/PostsWall';
import FullPageSpinner from '../ui/FullPageSpinner';

function ProfilePage() {
  const { sort, order, fields, setStatus, setCategories } = usePostsSelector();

  const { isLoading: isLoadingCurrentUser, user: currentUser } =
    useCurrentUser();

  const { isLoading: isLoadingCategories, data: categories } = useCategories();

  const { isLoading: isLoadingCurrentUserPosts, data: userPosts } =
    useCurrentUserPosts({
      sort,
      order,
      fields,
    });

  const isLoading =
    isLoadingCurrentUser ||
    isLoadingCategories ||
    isLoadingCurrentUserPosts ||
    !userPosts;

  if (isLoading) {
    return <FullPageSpinner />;
  }

  const statusFileter = fields.status || '';

  return (
    <>
      <SelectNavbar>
        <SelectNavbarButton
          buttonValue={''}
          buttonTitle={'All'}
          value={statusFileter}
          setValue={setStatus}
        />
        <SelectNavbarButton
          buttonValue={'active'}
          buttonTitle={'Active'}
          value={statusFileter}
          setValue={setStatus}
        />
        <SelectNavbarButton
          buttonValue={'unactive'}
          buttonTitle={'Unactive'}
          value={statusFileter}
          setValue={setStatus}
        />
        <SelectNavbarButton
          buttonValue={'locked'}
          buttonTitle={'Locked'}
          value={statusFileter}
          setValue={setStatus}
        />
      </SelectNavbar>

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
            <div className="d-block d-md-none">
              <UserProfileSection user={currentUser} isOwn={true} />
            </div>

            <PageSection>
              <PostsSortMenu />
            </PageSection>

            <PostsWall
              categories={categories}
              loadPosts={useCurrentUserPosts}
              sideBarAttach="bottom"
              isUserPosts={true}
            />
          </Col>
          {/* Sidebar */}
          <Col md={3} className="d-none d-md-block">
            <UserProfileSection user={currentUser} isOwn={true} />

            <PageSection>
              <CategorySearch
                values={fields?.['categories[cont]'] || []}
                onSelectValue={setCategories}
                categories={categories}
              />
            </PageSection>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ProfilePage;
