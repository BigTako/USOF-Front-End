import {
  getLike,
  getLikes,
  createLike as createLikeApi,
  updateLike as updateLikeApi,
  deleteLike as deleteLikeApi,
  getEntityLikes,
} from '../../services/apiLikes';

import {
  useAll,
  useCreateOne,
  useDeleteOne,
  useEntitySubentities,
  useOne,
  useUpdateOne,
} from '../factory/useFactory';

export const useLikes = (options) => useAll('likes', getLikes, options);

export const useLike = (id) => useOne(id, 'like', getLike);

export const useEntityLikes = (id, entity, options) =>
  useEntitySubentities(id, entity, 'likes', getEntityLikes, options);

export const useCreateLike = () =>
  useCreateOne('likes', createLikeApi, '', { active: true }, false);

export const useUpdateLike = () =>
  useUpdateOne('likes', updateLikeApi, '', { active: true });

export const useDeleteLike = () => useDeleteOne('Like', deleteLikeApi);
