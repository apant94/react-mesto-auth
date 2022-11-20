export const BASE_URL = "https://auth.nomoreparties.co";

const header = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const _checkStatus = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: header,
    body: JSON.stringify({ email, password }),
  }).then(_checkStatus);
};

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: header,
    body: JSON.stringify({ email, password }),
  }).then(_checkStatus);
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      ...header,
      Authorization: `Bearer ${token}`,
    },
  }).then(_checkStatus);
};
