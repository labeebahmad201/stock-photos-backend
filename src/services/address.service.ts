/* eslint-disable @typescript-eslint/camelcase */
import { Request } from 'express';
import UserModel from '../models/user.model';
import AddressModel from '../models/address.model';
import Country from './../models/country.model';

export default class AddressService {
  async updateOrCreate(req: Request, data: any) {
    const user = await UserModel.findOne({ _id: req.user._id }).populate(
      'addresses',
    );

    const { addresses } = user;

    const releventAddressOfType = addresses.filter(address => {
      if (address.type === data.type) {
        return true;
      }
      return false;
    });

    const country = await Country.findOne({ code: data.country_code });

    let addressModel;
    if (releventAddressOfType.length === 0) {
      addressModel = new AddressModel();
    } else {
      addressModel = await AddressModel.findOne({
        _id: releventAddressOfType[0]._id,
      });
    }

    addressModel.email = data.email;
    addressModel.firstname = data.firstname;
    addressModel.lastname = data.lastname;
    addressModel.company_name = data.company_name || '';
    addressModel.country = country;
    addressModel.street_address = data.street_address || '';
    addressModel.city = data.city;
    addressModel.zip_code = data.zip_code;
    addressModel.phone = data.phone;
    addressModel.type = data.type;
    addressModel.user = req.user._id;

    const savedAddress = await addressModel.save();
    if (savedAddress) {
      if (releventAddressOfType.length === 0) {
        user.addresses.push(savedAddress._id);
      }
      await user.save();
      return [true, 'Address updated', savedAddress];
    }
    return [false, 'Something went wrong', {}];
  }

  async getAddress(req: Request, type: 'billing' | 'shipping') {
    const user = await UserModel.findOne({ _id: req.user._id })
      .populate({
        path: 'addresses',
        select:
          'firstname lastname company_name country street_address city zip_code type',
        match: { type: { $eq: type } },
      })
      .select('_id');

    if (!user) {
      return [false, 'user not found', null];
    }

    if (user.addresses.length === 0) {
      return [false, 'Address not found', null];
    }

    return [true, 'Address fetched', user.addresses];
  }
}
