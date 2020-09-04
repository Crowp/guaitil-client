import environment from 'environment';
import * as EffectUtility from '../../utils/EffectUtility';
import HttpErrorResponseModel from '../../models/HttpErrorResponseModel';
import PersonModel from '../../models/PersonModel';

export const requestPeople = async () => {
  const endpoint = environment.api.persons.replace(':id', '');
  return await EffectUtility.getToModel(PersonModel, endpoint);
};
export const requestUpdatePerson = async person => {
  const endpoint = environment.api.persons.replace(':id', person.id);
  return await EffectUtility.putToModel(PersonModel, endpoint, person);
};
export const requestDeletePerson = async id => {
  const endpoint = environment.api.persons.replace(':id', id);
  const response = await EffectUtility.deleteToModel(PersonModel, endpoint);
  return response instanceof HttpErrorResponseModel ? response : id;
};

export const requestCreatePerson = async person => {
  const endpoint = environment.api.persons.replace(':id', '');
  return await EffectUtility.postToModel(PersonModel, endpoint, person);
};
