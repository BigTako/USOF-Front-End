import { Spinner } from 'react-bootstrap';
import { usePostsSelector } from '../../contexts/PostsSelectContext';
import FullContainer from '../../ui/FullContainer';
import PageSection from '../../ui/PageSection';
import { DarkGreyPillButton } from '../../ui/PillButtons';
import { TransparentPillContainer } from '../../ui/PillContainers';
import PostPreview from '../../ui/PostPreview';
import FullPageSpinner from '../../ui/FullPageSpinner';

function PostsWall({ loadPosts, categories, sideBarAttach, isUserPosts }) {
  const { sort, order, fields, limit, page, increaseLimit } =
    usePostsSelector();

  const {
    isLoadingPosts,
    postsLoadingError,
    data: posts,
  } = loadPosts({
    fields,
    sort,
    order,
    limit,
    page,
  });

  const isLoading = isLoadingPosts || !posts;

  const error = postsLoadingError;

  if (isLoading) {
    return <FullPageSpinner />;
  } else if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {posts && posts.length > 0 ? (
        posts?.map((post) => (
          <PageSection key={post.id}>
            <PostPreview
              categories={categories}
              post={post}
              sideBarAttach={sideBarAttach}
              maxContentLen={150}
              isUserPost={isUserPosts}
            />
          </PageSection>
        ))
      ) : (
        <FullContainer>
          <h5>No posts found</h5>
        </FullContainer>
      )}
      {posts && posts.length > 0 && posts.length > 4 && (
        <TransparentPillContainer
          style={{
            marginBottom: 'var(--container-offset)',
            padding: 'var(--container-padding)',
          }}
        >
          <DarkGreyPillButton as="button" onClick={increaseLimit}>
            {isLoadingPosts ? <Spinner /> : 'show more'}
          </DarkGreyPillButton>
        </TransparentPillContainer>
      )}
    </>
  );
}

export default PostsWall;
