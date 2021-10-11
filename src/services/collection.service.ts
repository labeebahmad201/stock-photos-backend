/* eslint-disable @typescript-eslint/camelcase */
import CollectionModel from '../models/collection.model';

export default class StateService {
  async getCollections() {
    const collections = await CollectionModel.find()
      .select('name')
      .sort({
        name: 'asc',
      });

    if (!collections) {
      return [true, 'Something went wrong', collections];
    }

    return [true, 'collections fetched', collections];
  }
}
