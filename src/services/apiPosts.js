import API_URL from './api.config';
import { getAll, getOne, createOne, updateOne, deleteOne } from './apiFactory';
// const API_URL = 'http://127.0.0.1:3000/api/v1/';

export const getPosts = (options) => getAll(API_URL + 'posts', options);

export const getPost = (id) => getOne(`${API_URL}posts/${id}`);

export const createPost = (postData) => createOne(`${API_URL}posts`, postData);

export const updatePost = (postData, id) =>
  updateOne(`${API_URL}posts/${id}`, postData);

export const deletePost = (id) => deleteOne(`${API_URL}posts/${id}`);

export const getCurrentUserPosts = (options) =>
  getAll(API_URL + 'posts/me', options);
