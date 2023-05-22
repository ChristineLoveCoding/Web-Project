var express = require('express'); var router = express.Router();
const multer = require('multer');
const ffmpeg = require('ffmpeg-static');
const exec = require('child_process').exec;
const db = require("../helpers/database");
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "public/videos/");
  },
  filename: function(req, file, cb) {
    var fileExt = file.mimetype.split("/")[1];
    const suffix = Date.now() + "-" + Math.round(Math.random()*1e9);
    cb(null, `${file.fieldname}-${suffix}.${fileExt}`);
  },
})

const upload = multer({ storage: storage });

function makeThunmbNail(file) {
  const filename = path.basename(file);
  const thumbnail = `public/images/${filename}.png`;
  const cmd = `${ffmpeg} -ss 00:00:01 -i ${file} -y -s 200x200 -vframes 1 -f image2 ${thumbnail}`;
  console.log(cmd);
  exec(cmd);
  return thumbnail;
}

/* GET posts listing. */
router.post("/upload", upload.single('video'), function (req, res, next) {
  if (!req.session) {
    res.render("error",  {message: `Please login first`});
  } else {
    // exec is sync already. Don't see a point of extracting it into a middleware.
    const thumbnail = makeThunmbNail(req.file.path);
    db.createPost(req.session.username, req.body.title, req.body.description, thumbnail, path.basename(req.file.path), function(error) {
      if (error) {
        res.render("error",  {message: `Create post failed: ${error}`, error: error});
      } else {
        res.redirect("/profile.html");
      }
    });
  }
});

router.post("/:post_id/delete", function (req, res, next) {
  if (!req.session) {
    res.render("error",  {message: `Please login first`});
  } else {
    db.deletePost(req.session.username, req.params.post_id, function(error) {
      if (error) {
        res.render("error",  {message: `Delete post failed: ${error}`, error: error});
      } else {
        res.redirect("/profile.html");
      }
    });
  }
});

router.get("/:post_id", function (req, res, next) {
  db.getPost(req.params.post_id, function(error, post, comments) {
    if (error) {
      res.render("error",  {message: `View post failed: ${error}`, error: error});
    } else {
      res.render('viewpost', { title: 'Viewpost', username: req.session.username, post: post, comments: comments });
    }
  });
});

router.post("/:post_id/comments", function (req, res, next) {
  if (!req.session) {
    res.render("error",  {message: `Please login first`});
  } else {
    db.makeComment(req.params.post_id, req.session.username, req.body.comment, function(error) {
      if (error) {
        res.render("error",  {message: `Post comments failed: ${error}`, error: error});
      } else {
        res.redirect(`/posts/${req.params.post_id}`);
      }
    });
  }
});

module.exports = router;
