import connectToAWS from "../connectToAWS";
const cAWS = connectToAWS();
const dynamodb = new cAWS.DynamoDB();

const handleCreateTable = (e) => {
   e.preventDefault();
   var params = {
      TableName: "Movies",
      KeySchema: [
         { AttributeName: "year", KeyType: "HASH" },
         { AttributeName: "title", KeyType: "RANGE" },
      ],
      AttributeDefinitions: [
         { AttributeName: "year", AttributeType: "N" },
         { AttributeName: "title", AttributeType: "S" },
      ],
      ProvisionedThroughput: {
         ReadCapacityUnits: 5,
         WriteCapacityUnits: 5,
      },
   };

   dynamodb.createTable(params, function (err, data) {
      if (err) {
         document.getElementById("textarea").innerHTML =
            "Unable to create table: " +
            "\n" +
            JSON.stringify(err, undefined, 2);
      } else {
         document.getElementById("textarea").innerHTML =
            "Created table: " + "\n" + JSON.stringify(data, undefined, 2);
      }
   });
};

// export default insertRowToDdbTable;
