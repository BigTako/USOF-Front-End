import { optionizeQuery } from '../utils/utils';
import API_URL from './api.config';
import { createOne, getAll, getOne, updateOne, deleteOne } from './apiFactory';
// const API_URL = 'http://127.0.0.1:3000/api/v1/';

export const getComments = (options) => getAll(API_URL + 'comments', options);

export const getComment = (id) => getOne(`${API_URL}comments/${id}`);

export const createComment = (commentData) =>
  createOne(`${API_URL}comments`, commentData);

export const updateComment = (commentData, id) =>
  updateOne(`${API_URL}comments/${id}`, commentData);

export const deleteComment = (id) => deleteOne(`${API_URL}comments/${id}`);

export const getEntityComments = (entityId, entityName, options) =>
  getAll(`${API_URL}comments/${entityName}/${entityId}`, options);
