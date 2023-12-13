import {
  getComment,
  getComments,
  createComment as createCommentApi,
  updateComment as updateCommentApi,
  deleteComment as deleteCommentApi,
  getEntityComments,
} from '../../services/apiComments';

import {
  useAll,
  useDeleteOne,
  useOne,
  useCreateOne,
  useUpdateOne,
  useEntitySubentities,
} from '../factory/useFactory';

export const useComments = (options) =>
  useAll('comments', getComments, options);

export const useComment = (id) => useOne(id, 'comment', getComment);

export const usePostComments = (id, options) =>
  useEntitySubentities(id, 'post', 'comments', getEntityComments, options);

export const useCommentReplies = (id, options) =>
  useEntitySubentities(id, 'comment', 'comments', getEntityComments, options);

export const useCreateComment = () =>
  useCreateOne('comments', createCommentApi, '', { active: true }, false);

export const useUpdateComment = () =>
  useUpdateOne('comments', updateCommentApi, '', { active: true });

export const useDeleteComment = () => useDeleteOne('Comment', deleteCommentApi);
