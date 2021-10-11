import * as yup from 'yup';
import CollectionModel from '../models/collection.model';
import Category from '../models/category.model';


export default {
    name: yup.string().required(),
    description: yup.string().required(),
    type: yup.string().required().oneOf(['freebie','stock_image_or_video']),
    cover_image: yup.string().required(),
    bundle_ref: yup.string().required(),
    collection_ref: yup.string().test('collection_exists', '${path} is invalid', async (collection_ref)=>{
        try{
            if(!collection_ref){
                return true;
            }

            const collection = await CollectionModel.findById(collection_ref);

            if(!collection){
                return false;
            }
    
            return true;
        }catch(e){
            return false;
        }
    }),
    category_ref: yup.string().test('category_exists', '${path} is invalid', async (categoryRef)=>{
        try{
            if(!categoryRef){
                return true;
            }

            const category = await Category.findById(categoryRef);

            if(!category){
                return false;
            }
    
            return true;
        }catch(e){
            return false;
        }
    })


}

