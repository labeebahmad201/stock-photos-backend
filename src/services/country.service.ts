/* eslint-disable @typescript-eslint/camelcase */
import countryModel from "../models/country.model";

export default class CountryService {
    async getCountries(){
        const countries = await countryModel.find().select('name code -_id');

        if(countries.length === 0){
            return [false, 'No countries found', {}];            
        }

        return [true, 'Countries fetched', {countries: countries}];
    }
}
