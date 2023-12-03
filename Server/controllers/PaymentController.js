const app = express();

const stripe = require("stripe")(process.env.SERVER_KEY);

app.use(cors());
app.use(bodyParser.json());

const calculateOrderAmount = (items) => {
    return 2000;
};

  app.post("/create-payment-intent", async (req, res) => {

    const { items } = req.body;
  
    const paymentIntent = await stripe.paymentIntents.create({

      amount: calculateOrderAmount(items),
      currency: "usd",

      automatic_payment_methods: {
        enabled: true,
      },
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });
