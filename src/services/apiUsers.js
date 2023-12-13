import API_URL from './api.config';
import { optionizeQuery } from '../utils/utils';
import { getAll, getOne, createOne, updateOne, deleteOne } from './apiFactory';
// const API_URL = 'http://127.0.0.1:3000/api/v1/';

export const getUsers = (options) => getAll(API_URL + 'users', options);

export const getUser = (id) => getOne(`${API_URL}users/${id}`);

export async function createUser(userData) {
  const formData = new FormData();

  // formData.append('id', id);
  formData.append('profilePicture', userData.profilePicture);
  formData.append('fullName', userData.fullName);
  formData.append('login', userData.login);
  formData.append('email', userData.email);
  formData.append('role', userData.role);
  formData.append('active', true);
  formData.append('activated', true);
  formData.append('password', userData.password);
  formData.append('passwordConfirm', userData.passwordConfirm);

  const query = `${API_URL}users`;
  const res = await fetch(query, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  });
  const data = await res.json();
  console.log(data.error);
  if (data.error) {
    throw new Error(`User cannot be created because: ${data.message}`);
  }
  return data.doc;
}

export async function updateUser(userData, id) {
  const formData = new FormData();

  formData.append('id', id);
  formData.append('profilePicture', userData.profilePicture);
  formData.append('fullName', userData.fullName);
  formData.append('role', userData.role);
  formData.append('login', userData.login);
  formData.append('email', userData.email);

  const query = `${API_URL}users/${id}`;
  const res = await fetch(query, {
    method: 'PATCH',
    credentials: 'include',
    body: formData,
  });
  const data = await res.json();
  if (data.error) {
    throw new Error(`User cannot be updated because: ${data.message}`);
  }
  return data.doc;
}

export async function updateCurrentUserInfo(newData) {
  const formData = new FormData();

  console.log('newData', newData);
  formData.append('profilePicture', newData.profilePicture);
  formData.append('fullName', newData.fullName);
  formData.append('role', newData.role);
  formData.append('login', newData.login);
  formData.append('email', newData.email);

  const query = `${API_URL}users/me`;
  const res = await fetch(query, {
    method: 'PATCH',
    credentials: 'include',
    body: formData,
  });

  const data = await res.json();
  if (data.error) {
    throw new Error(`User cannot be updated because: ${data.message}`);
  }
  return data.data;
}

export const updateCurrentUserPassword = (newData) =>
  updateOne(`${API_URL}users/updatePassword`, newData);

export const deleteUser = (id) => deleteOne(`${API_URL}users/${id}`);

export const deactivateCurrentUser = () => deleteOne(`${API_URL}users/me`);

export const getUserRating = (id) => getOne(`${API_URL}users/rating/${id}`);
