import API_URL from './api.config';

export async function signup({
  fullName,
  login,
  email,
  password,
  passwordConfirm,
}) {
  let res = await fetch(API_URL + 'auth/signup', {
    method: 'POST',
    credentials: 'include', // include cookies
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ fullName, login, email, password, passwordConfirm }),
  });

  let data = await res.json();

  if (data.status !== 'success') {
    console.log(data.messsage);
    throw new Error(`Singup failed because ${data.message}`);
  }
  return data;
}

export async function logout() {
  let res = await fetch(`${API_URL}auth/logout`, {
    method: 'POST',
    credentials: 'include', // include cookies
  });
  const data = await res.json();
  if (data.status !== 'success') {
    throw new Error(`Logout failed because ${data.message}`);
  }
}

export async function login({ email, password }) {
  let res = await fetch(`${API_URL}auth/login`, {
    method: 'POST',
    credentials: 'include', // include cookies
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  let data = await res.json();

  if (data.status !== 'success') {
    throw new Error(`Login failed because ${data.message}`);
  }

  return data;
}

export async function getCurrentUser() {
  let res = await fetch(`${API_URL}users/me`, { credentials: 'include' });

  let data = await res.json();

  if (data.status !== 'success') {
    console.log(data.messsage);
    return null;
  }
  return data?.doc;
}

export async function handleForgotPassword(email) {
  let res = await fetch(`${API_URL}auth/forgotPassword`, {
    method: 'POST',
    credentials: 'include', // include cookies
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  let data = await res.json();

  if (data.status !== 'success') {
    console.log(data.messsage);
    throw new Error(`Forgot password failed because ${data.message}`);
  }
  return data;
}

export async function resetPassword(token, password, passwordConfirm) {
  console.log(token.token, password, passwordConfirm);
  let res = await fetch(`${API_URL}auth/resetPassword/${token.token}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ password, passwordConfirm }),
  });

  let data = await res.json();

  if (data.status !== 'success') {
    console.log(data.messsage);
    throw new Error(`Reset password failed because ${data.message}`);
  }
  return data;
}
