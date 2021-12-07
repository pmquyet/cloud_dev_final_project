import axios from "axios";

const uploadFilesToS3 = async (s3, files, bucketName) => {
  //upload file to S3
  console.log("files get:", files);
  await Promise.all(
    files.map(async (file) => {
      const paramss3 = {
        Bucket: bucketName,
        Key: file.name, //filename
        Body: file,
        ContentType: "image/png",
        Expires: 3600, //time to expire in seconds
      };

      s3.getSignedUrl("putObject", paramss3, function (err, url) {
        axios({
          method: "put",
          url,
          data: file,
          headers: {
            "Content-Type": "image/png",
          },
        })
          .then((result) => {
            console.log("Done upload to s3, result :", result);
          })
          .catch((err) => {
            console.log("err", err);
          });
      });
    })
  );
};

export default uploadFilesToS3;

// for (var file in files) {
//   console.log(
//     "file name after get from drop:" + file.name + " start upload to S3"
//   );

//   const paramss3 = {
//     Bucket: bucketName,
//     Key: file.name, //filename
//     Body: file,
//     ContentType: "image/png",
//     Expires: 3600, //time to expire in seconds
//   };

//READING IN PARALLEL
// async function printFiles () {
//   const files = await getFilePaths();

//   await Promise.all(files.map(async (file) => {
//     const contents = await fs.readFile(file, 'utf8')
//     console.log(contents)
//   }));
// }
