import {socketAuthMiddleware} from "../middlewares/auth.middleware";
import MessageService from "../services/messages.service";
import * as yup from 'yup';
import sendMessageEventSchema from './../schema/sendMessageEvent.schema';
import {socketRespFormatter} from './../helpers';

export default function(ioServer){
    
    ioServer
    .use(socketAuthMiddleware)
    .on('connection', function(socket){

        socket.on('send_message', async function(data, akj){
            const dataParsed = JSON.parse(data);
            try{
                await yup.object().shape(sendMessageEventSchema)
                .validate({...dataParsed});
                
                dataParsed.from = socket.user._id;
                const service = new MessageService();
                const [status, message, payload] = await service.sendMessage(ioServer, dataParsed);
                if(akj){
                    akj(socketRespFormatter(status, message, payload));
                }
            }catch(e){
                console.log('e', e);
                if(e.errors){
                    akj(socketRespFormatter(false, e.name +': '+ e.message, e.errors));
                    return;
                }

                akj(socketRespFormatter(false, 'Something went wrong', null));                
                return;
            }
        });


    })
}   