var express = require('express');
var router = express.Router();

module.exports = function (firebase) {
  router.get('/', function(req, res) {
  	console.log("in index");
  	res.render('pages/index');
  });

  router.get("/search/:content", function (req, res) {
    var searchContent = req.params.content.toLowerCase().trim();
    console.log(searchContent);
    firebase.database().ref("/restaurant/").once('value').then(function (snapshot) {
      //console.log(snapshot.val());
      var temp = snapshot.val();
      var arr = [];
      Object.keys(temp).forEach(function (key, index) {
        arr[index] = {};
        arr[index] = temp[key];
        arr[index].id = key;
      });
      // console.log(arr[0]);
      var result = [];
      arr.forEach(function (element, index) {
        // console.log(arr[index]);
        if (element.region.toLowerCase() == searchContent
              || element.region.replace(/ /g, '').toLowerCase == searchContent
              || element.name.toLowerCase().includes(searchContent)
              || element.category.toLowerCase().includes(searchContent)
              || element.categoryreplace(/ /g, '').toLowerCase == searchContent) {
          result.push(arr[index]);
        }
      });

      console.log(result);
      // res.json({
      //   done: true,
      //   searchResult : result
      // })
      res.render("pages/searchResult", {searchResult : result});
    });
  })

  return router;
};
