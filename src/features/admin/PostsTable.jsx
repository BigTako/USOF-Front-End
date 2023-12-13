import {
  EntityTable,
  LimitedText,
  FormModal,
  StatusView,
  OpenModalFormButton,
} from './EntityTable';
import PostForm from '../posts/PostForm';
import { useCreatePost, useDeletePost, useUpdatePost } from '../posts/usePosts';

const headers = [
  '',
  'Title',
  'author',
  'Published',
  'Content',
  'Status',
  'Categories',
  'Likes',
  'Dislikes',
  'Comments',
  <OpenModalFormButton key={`create-post-open`} formName={'create-post'} />,
];

function PostsTable({ posts }) {
  const { isCreating, createEntity: createPost } = useCreatePost();
  const { isDeleting, deleteEntity: deletePost } = useDeletePost();
  const { isUpdating, updateEntity: updatePost } = useUpdatePost();

  return (
    <>
      <FormModal name={'create-post'}>
        <PostForm
          label={'Create post'}
          onSubmit={createPost}
          disabled={isCreating}
        />
      </FormModal>
      <EntityTable
        entityName={'post'}
        entities={posts}
        headers={headers}
        onDelete={deletePost}
        render={(post) => {
          const {
            id,
            title,
            authorInfo,
            content,
            status,
            categories,
            createdAt,
            likesCount,
            dislikesCount,
            commentsCount,
          } = post || {};
          return (
            <>
              <div>
                <strong>{id}</strong>
              </div>
              <div>
                <LimitedText>{title}</LimitedText>
              </div>
              <div>{authorInfo.login}</div>
              <div>{new Date(createdAt)?.toLocaleString()}</div>
              <div>
                <LimitedText>{content}</LimitedText>
              </div>
              <div>
                <StatusView status={status} />
              </div>
              <div>{categories.join(',')}</div>
              <div>{likesCount}</div>
              <div>{dislikesCount}</div>
              <div>{commentsCount}</div>
              <FormModal name={`edit-post-${post.id}`}>
                <PostForm
                  post={post}
                  label={'Update post'}
                  onSubmit={(data) =>
                    updatePost({ newData: data, id: post.id })
                  }
                  disabled={isUpdating}
                />
              </FormModal>
            </>
          );
        }}
      />
    </>
  );
}

export default PostsTable;
