const express = require("express");

const bodyParser = require("body-parser");

const gtts = require("gtts");

const fs = require("fs");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");

const PORT = process.env.PORT || 5000;

app.get("/texttospeech", (req, res) => {
  res.render("texttospeech", {
    title: "Text to Speech Demo - Free Media Tools",
  });
});

// bodlate    hbeeeeeeeeeeeeeeeeeeeeeeeeeeeee
app.post("/texttospeech", (req, res) => {
  var text = req.body.text;

  var language = req.body.language;

  outputFilePath = Date.now() + "output.mp3";

  var voice = new gtts(text, language);

  voice.save(outputFilePath, function (err, result) {
    if (err) {
      fs.unlinkSync(outputFilePath);
      res.send("Unable to covert to audio");
    }
    res.download(outputFilePath, (err) => {
      if (err) {
        fs.unlinkSync(outputFilePath);
        res.send("Unable to download the file");
      }

      fs.unlinkSync(outputFilePath);
    });
  });
});

app.listen(PORT, () => {
  console.log(`App is listening on Port ${PORT}`);
});
