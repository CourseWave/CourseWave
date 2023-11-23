const express = require("express");
const cors = require("cors");
const app = express();
const models = require("./models/index"); 

//* Users Router
const usersRoute = require("./routes/usersRouter");

//* Courses Router
const coursesRoute = require("./routes/coursesRouter");

//* Comments Router
const commentsRoute = require("./routes/commentsRouter");

app.use(cors());
app.use(express.json());

app.use(usersRoute);
app.use(coursesRoute);
app.use(commentsRoute);

// Call the initialization function to create tables
models.initializeModels();

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
