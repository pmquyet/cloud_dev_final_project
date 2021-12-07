import connectToAWS from "../connectToAWS";
const cAWS = connectToAWS();
const dynamodb = new cAWS.DynamoDB();

function insertRowToDdbTable(docClient, params) {
   //   var params = {
   //     TableName: "Movies",
   //     Item: {
   //       year: 2015,
   //       title: "The Big New Movie",
   //       info: {
   //         plot: "Nothing happens at all.",
   //         rating: 0,
   //       },
   //     },
   //   };
   docClient.put(params, function (err, data) {
      if (err) {
         console.log(
            "Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2)
         );
      } else {
         console.log(
            "PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2)
         );
      }
   });
}

export default insertRowToDdbTable;
