import Message from './../models/message.model';
import ConversationModel from '../models/conversation.model';
export default class MessageService {
  async sendMessage(ioServer, data) {
    const message = new Message();
    message.to = data.to;
    message.from = data.from;
    message.text = data.text;
    try {
      const messageSaved = await message.save();
      const conversationExists = await ConversationModel.findOne({
          $or : [
            {
                from: messageSaved.from,
                to: messageSaved.to
            },
            {
                from: messageSaved.to,
                to: messageSaved.from
            }              
          ]
      });

      if(!conversationExists){
        const conversationModel = new ConversationModel();
        conversationModel.from = messageSaved.from; 
        conversationModel.to = messageSaved.to;
        await conversationModel.save();
      }else{
          conversationExists.updated_at = new Date().toISOString();
          await conversationExists.save();
      }


      if (!messageSaved) {
        return [false, 'Message could not be saved', null];
      }
      
      const p = await Message
      .populate(messageSaved, [{path: 'from', select: '_id firstname lastname'}, {path: 'to', select: '_id firstname lastname'}]);

      const json = JSON.stringify(messageSaved);
      const room = messageSaved.to._id.toString();
      console.log('room', room, json);
      ioServer.to(room).emit('new_message', json);

      return [true, 'Message sent', messageSaved];
    } catch (e) {
      return [false, 'Message could not be sent', e.message];
    }
  }

  async getConversations(userObjectId){
      const conversations = await ConversationModel.find({
        $or: [
            {from: userObjectId},
            {to: userObjectId}            
        ]
      })
      .populate('from', '_id firstname lastname email')
      .populate('to', '_id firstname lastname email')
      .sort({
          updated_at: 'desc'
      });

      return [true, 'Conversations fetched', conversations];
  }
}
