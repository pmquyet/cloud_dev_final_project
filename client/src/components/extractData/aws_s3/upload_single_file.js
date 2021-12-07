import axios from "axios";

const Upload_Single_Files_To_S3 = async (s3, file, bucketName) => {
   //upload file to S3
   // console.log("files get:", file);

   const paramss3 = {
      Bucket: bucketName,
      Key: file.name, //filename
      Body: file,
      ContentType: "image/png",
      Expires: 3600, //time to expire in seconds
   };

   const res = await s3.getSignedUrl(
      "putObject",
      paramss3,
      function (err, url) {
         axios({
            method: "put",
            url,
            data: file,
            headers: {
               "Content-Type": "image/png",
            },
         });
         // .then((result) => {
         //    console.log("Done upload to s3, result :", result);
         // })
         // .catch((err) => {
         //    console.log("err", err);
         // });
      }
   );
   return Promise.resolve(res);
};

export default Upload_Single_Files_To_S3;
