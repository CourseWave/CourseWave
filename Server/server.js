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

//* Purchases Router
const purchasesRoute = require("./routes/purchasesRouter");

//* liveSessions Router
const liveSessionsRoute = require("./routes/liveSessionsRouter");

app.use(cors());
app.use(express.json());

app.use(usersRoute);
app.use(coursesRoute);
app.use(commentsRoute);
app.use(cartRoute);
app.use(purchasesRoute);
app.use(liveSessionsRoute);

// Call the initialization function to create tables
models.initializeModels();



const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



  app.post("/create-payment-intent", async (req, res) => {
    console.log(req);
    if(!req.body.amount){
      return;
    }
    const { amount } = req.body;
  console.log(req);
    const paymentIntent = await stripe.paymentIntents.create({

      amount:3000,
      currency: "usd",

      automatic_payment_methods: {
        enabled: true,
      },
    });
    console.log();
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });


app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

