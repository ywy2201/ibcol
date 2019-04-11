const cors = (process.env.NOW_REGION === undefined) ? require('micro-cors')() : undefined;


// console.log('cors', cors === undefined, process.env.NOW_REGION === undefined);

// const fs = require('fs');
const CryptoJS = require("crypto-js");
const { randomBytes } = require('crypto')


const atob = str => Buffer.from(str, 'base64').toString('binary');

// const formidable = require('formidable');

const SALT = process.env.SALT ? process.env.SALT : "@)$&R(DHADKJHASAJKSHKJHDSA";
const BUCKET_NAME = process.env.BUCKET_NAME ? process.env.BUCKET_NAME : "ibcol-uploads-dev";

const {Storage} = require('@google-cloud/storage');

// fs.writeFileSync(process.env.GOOGLE_APPLICATION_CREDENTIALS, atob(process.env.GOOGLE_APPLICATION_CREDENTIALS_DATA));
// console.log(JSON.parse(atob(process.env.GOOGLE_APPLICATION_CREDENTIALS_DATA)));

const storage = new Storage({
  credentials: JSON.parse(atob(process.env.GOOGLE_APPLICATION_CREDENTIALS_DATA))
});



// Micro deps
const {send, json, text} = require('micro')

if (process.env.ENV === 'local')
  require('now-env');


const generateUUID = (size = 10) => {
  return randomBytes(Math.ceil(size * 3 / 4))
    .toString('base64')
    .slice(0, size)
    .replace(/\+/g, 'a')
    .replace(/\//g, 'b')
}

const ServerId = {
  encrypt: (uuid) => {
    return CryptoJS.AES.encrypt(uuid, SALT).toString()
  },
  decrypt: (serverId) => {
    return CryptoJS.AES.decrypt(serverId, SALT).toString(CryptoJS.enc.Utf8)
  },
}




// const {routeToDefaultPath} = require('../helpers/route');

const generateUploadMeta = (fileMeta) => {

  return new Promise(
    async resolve => {
      console.log('fileMeta', fileMeta);
      const uuid = `${generateUUID()}/${fileMeta.name}`;

      

      const options = {
        action: "write",
        contentType: fileMeta.type,
        expires: Date.now() + 1000 * 60 * 10, // ten minute
        // contentMd5: fileMeta.contentMd5
      };

      
      
      const bucket = `${BUCKET_NAME}-temp`;

      // Uploads a local file to the bucket
      const signedUrl = await storage.bucket(bucket).file(uuid).getSignedUrl(options);

      

      resolve({serverId: ServerId.encrypt(uuid), signedUrl: signedUrl[0]});
    }
  );

    
}


const deleteFilepondUploads = (serverId) => {

  return new Promise(
    async resolve => {
      const uuid = ServerId.decrypt(serverId);

      try {
        console.log(`deleting gs://${BUCKET_NAME}-temp/${uuid}...`);
        
        // Deletes the file from the temp bucket
        await storage
          .bucket(`${BUCKET_NAME}-temp`)
          .file(uuid)
          .delete();

        console.log(`gs://${BUCKET_NAME}-temp/${uuid} deleted.`);


        resolve(`gs://${BUCKET_NAME}-temp/${uuid}`);
      } catch (e) {
        console.log(`object not found in gs://${BUCKET_NAME}-temp/${uuid}...`);
        console.log(`trying to delete object from gs://${BUCKET_NAME}/${uuid}...`);
        // Try to deletes the file from the storage bucket
        await storage
          .bucket(`${BUCKET_NAME}`)
          .file(uuid)
          .delete();

        console.log(`gs://${BUCKET_NAME}/${uuid} deleted.`);


        resolve(`gs://${BUCKET_NAME}/${uuid}`);

      }
    }
  );

    
}


// const processFilepondUploads = (req) => {
//   new formidable.IncomingForm();

//   return new Promise(
//     resolve => {
//       new formidable.IncomingForm().parse(req, async (err, fields, files) => {
//         if (err) {
//           console.error('Error', err)
//           throw err
//         }
        
//         const file = files.filepond;

//         // console.log('File', file)

//         const uuid = `${generateUUID()}/${file.name}`;
//        // const storage = new Storage();
        

//         // Uploads a local file to the bucket
//         await storage.bucket(`${BUCKET_NAME}-temp`).upload(file.path, {
//           // Support for HTTP requests made with `Accept-Encoding: gzip`
//           gzip: true,
//           // By setting the option `destination`, you can change the name of the
//           // object you are uploading to a bucket.
//           destination: uuid,
//           metadata: {
//             // Enable long-lived HTTP caching headers
//             // Use only if the contents of the file will never change
//             // (If the contents will change, use cacheControl: 'no-cache')
//             cacheControl: 'private, max-age=31536000',
//           },
//         });

//         console.log(`${file.name} uploaded to gs://${BUCKET_NAME}-temp/${uuid}.`);

//         resolve(CryptoJS.AES.encrypt(uuid, SALT).toString());

//       })
//     }
//   );

    
// }


const filepodRoute = async (req, res) => {
  
  console.log('method', req.method);

  if (req.method === 'DELETE') {
    

    const serverId = await text(req);

    return send(res, 200, await deleteFilepondUploads(serverId));

  }
  
  if (req.method === 'POST') {

    

    // const serverId = await processFilepondUploads(req);
    // return send(res, 200, serverId);  

    const fileMeta = await json(req);

    return send(res, 200, await generateUploadMeta(fileMeta));
  }


  return send(res, 200);
  
}



module.exports = (cors !== undefined) ? cors(filepodRoute) : filepodRoute;