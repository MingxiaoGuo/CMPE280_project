var express = require('express');
var router = express.Router();

module.exports = function (firebase) {
  router.get('/', function(req, res) {
  	res.render("pages/demo");
  });

  /**
   * for add comments for certain restaurant
   */
  router.get("/comments", function (req, res) {
    var commentsRef = firebase.database().ref("comments/");
    var newCommentRef = commentsRef.push();
    var temp = {};
    temp["some_rest_id"] = true;
    var tempUser1 = {};
    tempUser1["user_id_1"] = true;
    var tempUser2 = {};
    tempUser2["user_id_2"] = true;
    newCommentRef.set({
      restaurant_id : temp,
      commentList : [
        {
          content: "hello world",
          rating: 4,
          userId: tempUser1
        },
        {
          content: "hello2 world2",
          rating: 5,
          userId: tempUser2
        }
      ]
    })
    .then(function() {
      return res.json({done: true});
    })
    .catch(function(error) {
      console.log('insert comment failed');
      return res.json({done: false});
    });
  });
  router.get("/allComments", function (req, res) {
    console.log("in all comments")
    firebase.database().ref("/comments/").once('value').then(function(snapshot) {
      var temp = snapshot.val();
      //console.log(temp);
      var arr = [];
      Object.keys(temp).forEach(function (key, index) {
         console.log(temp[key].commentList);
        arr[index] = {};
        arr[index].id = key;
        arr[index].restaurantId = temp[key].restaurant_id;
        arr[index].commentList = temp[key].commentList;
      });
      console.log(arr);
    });
  })

  router.get("/comments/:id", function (req, res) {
    var url = "/comments/" + req.params.id;
    firebase.database().ref(url).once('value').then(function(snapshot) {
      console.log(snapshot.val().commentList);
    });
  });



  router.post("/", function (req, res) {

  });

  return router;
};
