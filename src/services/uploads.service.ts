import { File } from 'formidable';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

export default class UploadsService {
  async upload(file: File) {
    const lastOccurenceOfDot = file.name.lastIndexOf('.');
    let extension = '';

    if (lastOccurenceOfDot >= 0) {
      extension = file.name?.substring(lastOccurenceOfDot);
    }

    const fileNewName = uuidv4() + extension;

    const path = file.path;
    const newPath = process.cwd() + '/src/uploads/' + fileNewName;

    const isItMoved = await new Promise((resolve, reject) => {
      fs.rename(path, newPath, function(err) {
        if (err) {
          resolve(false);
        }
        resolve(true);
      });
    });

    if (!isItMoved) {
      return [false, 'Something Went Wrong', null];
    } else {
      const url = 'http://localhost:3000/images/' + fileNewName;
      return [true, 'File Uploaded', { url: url }];
    }
  }
}
