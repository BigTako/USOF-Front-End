import API_URL from './api.config';
import { getAll, getOne, createOne, updateOne, deleteOne } from './apiFactory';
// const API_URL = 'http://127.0.0.1:3000/api/v1/';

export const getLikes = (options) => getAll(API_URL + 'likes', options);

export const getLike = (id) => getOne(`${API_URL}likes/${id}`);

export const createLike = (likeData) => createOne(`${API_URL}likes`, likeData);

export const updateLike = (likeData, id) =>
  updateOne(`${API_URL}likes/${id}`, likeData);

export const deleteLike = (id) => deleteOne(`${API_URL}likes/${id}`);

export const getEntityLikes = (entityId, entityName, options) =>
  getAll(`${API_URL}likes/${entityName}/${entityId}`, options);
