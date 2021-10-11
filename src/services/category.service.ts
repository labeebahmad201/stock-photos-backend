/* eslint-disable @typescript-eslint/camelcase */
import CategoryModel from '../models/category.model';

export default class StateService {
  async getCategories() {
    const categories = await CategoryModel.find()
      .select('name')
      .sort({
        name: 'asc',
      });

    if (!categories) {
      return [true, 'Something went wrong', categories];
    }

    return [true, 'categories fetched', {categories : categories}];
  }
}
