import HttpErrorResponseModel from '../models/HttpErrorResponseModel';
import HttpUtility from './HttpUtility';
import AuthService from '../services/AuthService';

export async function getToModel(Model, endpoint, params) {
  const response = await HttpUtility.get(endpoint, params, _getHeaderToken());

  return _restModelCreator(Model, response);
}

export async function postToModel(Model, endpoint, data) {
  const response = await HttpUtility.post(endpoint, data, _getHeaderToken());

  return _restModelCreator(Model, response);
}

export async function putToModel(Model, endpoint, data) {
  const response = await HttpUtility.put(endpoint, data, _getHeaderToken());

  return _restModelCreator(Model, response);
}

export async function deleteToModel(Model, endpoint) {
  const response = await HttpUtility.delete(endpoint, _getHeaderToken());

  return _restModelCreator(Model, response);
}

function _restModelCreator(Model, response) {
  if (response instanceof HttpErrorResponseModel) {
    return response;
  }

  return !Array.isArray(response.data) ? new Model(response.data) : response.data.map(json => new Model(json));
}

const _getHeaderToken = () => {
  return AuthService.loggedIn() ? { headers: { Authorization: `Bearer ${AuthService.getToken()}` } } : {};
};
