import environment from 'environment';
import EffectUtility from '../../utils/EffectUtility';

import PersonModel from '../../models/PersonModel';

export default class PersonEffect {
  static requestPerson = async filter => {
    const endpoint = environment.api.persons.replace('/:id', `?filter=${filter}`);
    return await EffectUtility.getToModel(PersonModel, endpoint);
  };
  static requestUpdatePerson = async person => {
    const endpoint = environment.api.persons.replace(':id', person.id);
    return await EffectUtility.putToModel(PersonModel, endpoint, person);
  };
  static requestDeletePerson = async id => {
    const endpoint = environment.api.persons.replace(':id', id);
    const response = await EffectUtility.deleteToModel(PersonModel, endpoint);
    return response instanceof HttpResponseModel ? response : id;
  };

  static requestCreatePerson = async person => {
    const endpoint = environment.api.persons.replace(':id', '');
    return await EffectUtility.postToModel(PersonModel, endpoint, person);
  };
}
