//GET DATA AFTER USING TEXTRACT
const postToAwsTextract = async (filename) => {
   const response = await fetch(
      "https://vr5x8w4q7l.execute-api.ap-southeast-1.amazonaws.com/Production/ocr",
      {
         method: "POST",
         headers: {
            Accept: "application/json",
            "Content-Type": "application.json",
         },
         body: JSON.stringify(filename),
      }
   );
   //print out data get from OCR
   //  const OCRBody = await response.json();
   //  console.log("BODY", OCRBody);
   return Promise.resolve(response);
};

export default postToAwsTextract;
