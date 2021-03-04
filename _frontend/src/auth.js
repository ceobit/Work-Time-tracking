const login = (username, password) => {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  };

  return fetch(`/api/signin`, requestOptions)
  .then(handleResponse)
  .then(user => {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));

    return user;
  });
}

const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}

const register = user => {

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  };

  return fetch(`/api/signup`, requestOptions).then(handleResponse);
}


const handleResponse = response => {

  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        // location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

export const http = {
  login,
  logout,
  register
}
