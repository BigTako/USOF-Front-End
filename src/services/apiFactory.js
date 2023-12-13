import API_URL from './api.config';
import { optionizeQuery } from '../utils/utils';

// const API_URL = 'http://127.0.0.1:3000/api/v1/';
export async function getAll(queryApi, options) {
  const query = optionizeQuery(queryApi, options);

  const res = await fetch(query, { method: 'GET', credentials: 'include' });

  if (!res.ok) {
    throw new Error(`ERROR: ${data.message}`);
  }

  const data = await res.json();
  if (data.status !== 'success') {
    throw new Error(`ERROR: ${data.message}`);
  }

  return data.docs;
}

export async function getOne(queryApi) {
  const res = await fetch(queryApi, { method: 'GET', credentials: 'include' });
  const data = await res.json();

  if (data.status !== 'success') {
    throw new Error(`ERROR: ${data.message}`);
  }

  return data.doc;
}

export async function createOne(queryApi, data) {
  const res = await fetch(queryApi, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  const resData = await res.json();

  if (resData.status !== 'success') {
    console.log(resData);
    throw new Error(`ERROR: ${resData.message}`);
  }

  return resData.doc;
}

export async function updateOne(queryApi, data) {
  console.log(data);
  const res = await fetch(queryApi, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  const resData = await res.json();

  if (resData.status !== 'success') {
    throw new Error(`ERROR: ${resData.message}`);
  }

  return resData.doc;
}

export async function deleteOne(queryApi) {
  const res = await fetch(queryApi, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`ERROR: ${res.statusText}`);
  }

  return null;
}
