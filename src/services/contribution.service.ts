/* eslint-disable @typescript-eslint/camelcase */
import AssetModel, { AssetDocument } from '../models/asset.model';
import _ from 'lodash';

export default class ContributionService {
  async contribute(data: any) {
    let asset: AssetDocument = new AssetModel();
    asset.name = data.name;
    asset.description = data.description;
    asset.type = data.type;
    asset.cover_image = data.cover_image;
    asset.bundle_ref = data.bundle_ref;
    asset.collection_ref = data.collection_ref;

    try {
      const assetSaved = await asset.save();
      return [true, 'Asset saved', { contribution: assetSaved }];
    } catch (e) {
      return [false, 'Something went wront', e];
    }
  }
}
