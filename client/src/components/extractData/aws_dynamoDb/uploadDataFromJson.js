const getDataFromJsonAndUpload = (docClient, files) => {
   var txt = "" + "Importing movies into DynamoDB. Please wait..." + "\n";
   //   document.getElementById("textarea").innerHTML = "HI";

   var file = files[0];
   if (file) {
      var r = new FileReader();
      r.onload = function (e) {
         var contents = e.target.result;
         var allMovies = JSON.parse(contents);

         allMovies.forEach(function (movie) {
            txt += "Processing: " + movie.title + "\n";
            var params = {
               TableName: "Movies",
               Item: {
                  year: movie.year,
                  title: movie.title,
                  info: movie.info,
               },
            };
            docClient.put(params, function (err, data) {
               if (err) {
                  txt += "Unable to add movie: " + +movie.title + "\n";
                  txt += "Error JSON: " + JSON.stringify(err) + "\n";
               } else {
                  txt += "PutItem succeeded: " + movie.title + "\n";
               }
            });
         });
      };
      r.readAsText(file);
   } else {
      alert("Could not read movie data file");
   }
   return txt;
};

export default getDataFromJsonAndUpload;
