const express = require("express");
const cors = require("cors");
const models = require("./models/index");
const app = express();
app.use(express.static("public"));

//* Users Router
const usersRoute = require("./routes/usersRouter");

//* Courses Router
const coursesRoute = require("./routes/coursesRouter");

//* Comments Router
const commentsRoute = require("./routes/commentsRouter");

//* Cart Router
const cartRoute = require("./routes/cartRouter");

//* Payments Router
const paymentsRoute = require("./routes/paymentsRouter");

app.use(cors());
app.use(express.json());

app.use(usersRoute);
app.use(coursesRoute);
app.use(commentsRoute);
app.use(cartRoute);
app.use(paymentsRoute);

// Call the initialization function to create tables
models.initializeModels();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
