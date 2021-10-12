import Message from './../models/message.model';

export default class MessageService{
    async sendMessage(ioServer, data){
        const message = new Message();
        message.to = data.to;
        message.from = data.from;
        message.text = data.text;
        try {
            const messageSaved = await message.save();
        
            if(!messageSaved){
                return [false, 'Message could not be saved', null];            
            }
            const json = JSON.stringify(messageSaved);
            const room = messageSaved.to.toString();

            ioServer.to(room).emit('new_message', json);
            
            return [true, 'Message sent', messageSaved];
        }catch(e){
            return [false, 'Message could not be sent', e.message];
        }

    }
}