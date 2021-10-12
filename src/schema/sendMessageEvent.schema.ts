import * as yup from 'yup';
import UserModel from '../models/user.model';

export default {
    text: yup.string().required(),    
    to: yup.mixed().required().test({
        name: 'existsUser',
        message: '${path} is invalid',
        test: async (userRef)=>{
            try{
                const toUser = await UserModel.findOne({
                    _id: userRef
                });

                if(toUser){
                    return true; 
                }
                return false;
            }catch(e){
                return false;
            }

        }
    })
}