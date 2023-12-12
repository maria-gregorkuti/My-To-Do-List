import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

// Date in footer
let year = new Date().getFullYear();

// Date in today.ejs
let currentDate = new Date().toLocaleString("en", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

const textArr = [];
const textWorkArr = [];

app.get("/", (req, res) => {
  res.render("index.ejs", {
    year: year,
    header: currentDate,
    text: req.body["input"],
    textArr: textArr,
    URL: "today",
    gifNum:2
  });
});

app.get("/today", (req, res) => {
  res.redirect("/");
});

app.get("/work", (req, res) => {
  res.render("index.ejs", {
    textW: req.body["input"],
    year: year,
    header: "Work List",
    textArr:textWorkArr,
    URL:"work",
    gifNum:1
  });
});

app.post("/today", (req, res) => {
  var text = req.body["input"];
    textArr.push(text);

 // DELETEbtn
 if(req.body.delete){
  const index = textArr.indexOf(req.body.delete); 
  console.log(index);
  if (index > -1) { // only splice array when item is found
      textArr.splice(index, 1);
  }
}
  res.redirect("/today");
});

app.post("/work", (req, res) => {
  var textW = req.body["input"];
  textWorkArr.push(textW);
  res.redirect("/work");
});

app.post("/delete", (req, res) => {
  var textToDelete = req.body.delete;
  var indexToday = textArr.indexOf(textToDelete);
  var indexWork = textWorkArr.indexOf(textToDelete);

  if (indexToday !== -1) {
    textArr.splice(indexToday, 1);
    res.redirect("/");
  } else if (indexWork !== -1) {
    textWorkArr.splice(indexWork, 1);
    res.redirect("/work");
  }
});


app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});

