
const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./src/config/db");
const passport = require("passport");

const app = express();

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("./src/config/passport")(); 


app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/posts", passport.authenticate("jwt", { session: false }), require("./src/routes/posts"));

// const PORT = 8081;
const PORT = process.env.PORT || 5001;


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
