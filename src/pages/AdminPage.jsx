import SelectNavbar from '../ui/SelectNavbar';
import SelectNavbarButton from '../ui/SelectNavbarButton';

import { Container, Row } from 'react-bootstrap';
import { useState } from 'react';

import PostsTable from '../features/admin/PostsTable';

import UsersTable from '../features/admin/UsersTable';
import LikesTable from '../features/admin/LikesTable';
import CategoriesTable from '../features/admin/CategoriesTable';
import CommentsTable from '../features/admin/CommentsTable';
import { usePosts } from '../features/posts/usePosts';
import { useUsers } from '../features/users/useUsers';
import { useComments } from '../features/comments/useComments';
import { useLikes } from '../features/likes/useLikes';
import { useCategories } from '../features/categories/useCategories';
import FullPageSpinner from '../ui/FullPageSpinner';

function AdminPage() {
  const [entity, setEntity] = useState('posts');

  const { isLoadingPosts, postsLoadingError, data: posts } = usePosts();
  const { isLoadingUsers, usersLoadingError, data: users } = useUsers();
  const {
    isLoadingComments,
    commentsLoadingError,
    data: comments,
  } = useComments();
  const { isLoadingLikes, likesLoadingError, data: likes } = useLikes();
  const {
    isLoadingCategories,
    categoriesLoadingError,
    data: categories,
  } = useCategories();

  const isLoading =
    isLoadingPosts ||
    isLoadingUsers ||
    isLoadingComments ||
    isLoadingLikes ||
    isLoadingCategories ||
    !posts ||
    !users ||
    !likes ||
    !categories ||
    !comments;

  const error =
    postsLoadingError ||
    usersLoadingError ||
    commentsLoadingError ||
    categoriesLoadingError ||
    likesLoadingError;

  if (isLoading) {
    return <FullPageSpinner />;
  } else if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <SelectNavbar>
        <SelectNavbarButton
          buttonValue="posts"
          buttonTitle={'Posts'}
          value={entity}
          setValue={setEntity}
        />
        <SelectNavbarButton
          buttonValue="users"
          buttonTitle={'Users'}
          value={entity}
          setValue={setEntity}
        />
        <SelectNavbarButton
          buttonValue="comments"
          buttonTitle={'Comments'}
          value={entity}
          setValue={setEntity}
        />
        <SelectNavbarButton
          buttonValue="likes"
          buttonTitle={'Likes'}
          value={entity}
          setValue={setEntity}
        />
        <SelectNavbarButton
          buttonValue="categories"
          buttonTitle={'Categories'}
          value={entity}
          setValue={setEntity}
        />
      </SelectNavbar>
      <Container
        style={{
          height: '100vh',
          padding: '0',
        }}
        fluid="xl"
      >
        <Row
          style={{
            margin: 'var(--page-layout-offset) 0',
            padding: '0',
          }}
        >
          {entity === 'posts' && <PostsTable posts={posts} />}
          {entity === 'users' && <UsersTable users={users} />}
          {entity === 'comments' && <CommentsTable comments={comments} />}
          {entity === 'likes' && <LikesTable entities={likes} />}
          {entity === 'categories' && <CategoriesTable entities={categories} />}
        </Row>
      </Container>
    </>
  );
}

export default AdminPage;
