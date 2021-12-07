import { v4 as uuidv4 } from "uuid";

const InsertMultipleRowToDbTable = async (docClient, tempdata) => {
   // const tempdata = useSelector((state) => state.tempData.listData);
   console.log("RUN TO HERE");
   tempdata.forEach((row) => {
      var paramsdb = {
         TableName: "CubeTestData",
         Item: row,
      };

      docClient.put(paramsdb, function (err, data) {
         if (err) {
            console.log(
               "Unable to add item: " + "\n" + JSON.stringify(err, undefined, 2)
            );
         } else {
            console.log(
               "PutItem succeeded: " + "\n" + JSON.stringify(data, undefined, 2)
            );
            // alert(
            //    "Successful save data to system! You can continue with new extract or return back main table."
            // );
         }
      });
   });
};

export default InsertMultipleRowToDbTable;
