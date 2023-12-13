import {
  getPosts,
  getPost as getPostApi,
  createPost as createPostApi,
  updatePost as updatePostApi,
  deletePost as deletePostApi,
  getCurrentUserPosts,
} from '../../services/apiPosts';

import {
  useAll,
  useOne,
  useDeleteOne,
  useCreateOne,
  useUpdateOne,
} from '../factory/useFactory';

export const usePosts = (options) => useAll('posts', getPosts, options);

export const usePost = (id) => useOne(id, 'post', getPostApi);

export const useCreatePost = () => useCreateOne('posts', createPostApi, '/me');

export const useUpdatePost = () => useUpdateOne('posts', updatePostApi, '/me');

export const useDeletePost = () => useDeleteOne('Post', deletePostApi);

export const useCurrentUserPosts = (options) =>
  useAll('currentUserPosts', getCurrentUserPosts, options);
