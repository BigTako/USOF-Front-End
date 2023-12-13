import API_URL from './api.config';

import { getAll, getOne, createOne, updateOne, deleteOne } from './apiFactory';

// const API_URL = 'http://127.0.0.1:3000/api/v1/';

export const getCategories = (options) =>
  getAll(API_URL + 'categories', options);

export const getCategory = (id) => getOne(`${API_URL}categories/${id}`);

export const createCategory = (categoryData) =>
  createOne(`${API_URL}categories`, categoryData);

export const updateCategory = (categoryData, id) =>
  updateOne(`${API_URL}categories/${id}`, categoryData);

export const deleteCategory = (id) => deleteOne(`${API_URL}categories/${id}`);
