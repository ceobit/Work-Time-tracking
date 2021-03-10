//auth
const login = (username, password) => {

  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({username, password}),
  };

  return fetch(`/api/signin`, requestOptions).
    then(handleResponse).
    then(user => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('user', JSON.stringify(user));

      return user;
    });
};

const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
};

const register = user => {

  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  };

  return fetch(`/api/signup`, requestOptions).then(handleResponse);
};

//Date Records

const createRecord = (properties) => {

  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({...properties}),
  };

  return fetch(`/api/create`, requestOptions).
    then(handleResponse).
    then(records => {
      return records;
    });
};

const getRecords = () => {

  const requestOptions = {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  };

  return fetch(`/api/records`, requestOptions).
    then(handleResponse).
    then(record => {
      return record;
    });
};

const deleteRecords = (recordId) => {

  const requestOptions = {
    method: 'DELETE',
    headers: {'Content-Type': 'application/json'},
  };

  return fetch(`/api/delete/${recordId}`, requestOptions).
    then(handleResponse).
    then(record => {
      return record;
    });
};

const updateRecords = (recordId, description) => {

  const requestOptions = {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({description}),
  };

  return fetch(`/api/patch/${recordId}`, requestOptions).
    then(handleResponse).
    then(record => {
      return record;
    });
};

//Common

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
};

export const http = {
  login,
  logout,
  register,
  createRecord,
  getRecords,
  deleteRecords,
  updateRecords
};
