import { File } from 'formidable';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

export default class UploadsService {
  async upload(file: File, data) {
    const isImage = file.type.indexOf('image/') >= 0 ? true : false;
    
    const lastOccurenceOfDot = file.name.lastIndexOf('.');
    let extension = '';

    if (lastOccurenceOfDot >= 0) {
      extension = file.name?.substring(lastOccurenceOfDot);
    }

    const fileNewName = uuidv4() + extension;

    const path = file.path;
    let newPath;

    let isSecret = data.is_secret ? JSON.parse(data.is_secret) : null;

    if( isSecret === true) {
      newPath = process.cwd() + '/src/secret/' + fileNewName;
    }else{
      newPath = process.cwd() + '/src/uploads/' + fileNewName;
    }

    let self = this;
    const isItMoved = await new Promise((resolve, reject) => {
      fs.rename(path, newPath, function(err) {
        if (err) {
          resolve(false);
        }
        if(isImage){
          self.generateThumbnail(newPath, 100);
          self.generateThumbnail(newPath, 200);        
          self.generateThumbnail(newPath, 300);        
          self.generateThumbnail(newPath, 500);                
        }
        resolve(true);
      });
    });

    if (!isItMoved) {
      return [false, 'Something Went Wrong', null];
    } else {

      if(isSecret) {
        return [true, 'File Uploaded', { ref: fileNewName }];
      } else {
        const url = 'http://localhost:3000/images/' + fileNewName;        
        return [true, 'File Uploaded', { url: url }];
      }

    }
  }

  async generateThumbnail(path: string, size = 100){
    
    const dotLocation = path.lastIndexOf('.');
    const beforeDot = path.substring(0, dotLocation);
    const afterDot = path.substring(dotLocation);    

    let thumbPath = beforeDot + `-${size}` + afterDot;
    
    sharp(path)
    .resize(size)
    .jpeg({ mozjpeg: true })
    .toBuffer()
    .then( data => { 
      fs.writeFile(thumbPath, data, (err)=>{
        console.log('err', err);
      });
     })
    .catch( err => { 
      console.log('err', err);
     });

  }
}
