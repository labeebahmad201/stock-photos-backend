/* eslint-disable @typescript-eslint/camelcase */
import stateModel from '../models/state.model';

export default class StateService {
  
  async getStates(country_code: string) {
    const states = await stateModel
      .find({
        country_code: country_code.toUpperCase(),
      })
      .sort({
        name: 'asc',
      })
      .select('name code country_code -_id');

    if (states.length === 0) {
      return [false, 'No states found', null];
    }

    return [true, 'States fetched', { states: states }];
  }

}
