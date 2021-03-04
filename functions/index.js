const functions = require('firebase-functions');
const cors=require('cors')
const express=require('express')
const stripe = require("stripe")(
    "sk_test_51I4BCXAwGqqor8yU73R7TY059Qz2PyBUpRRQPBRbBuiW3MLJuiqCkeQYMp5CIL7iy1ZGbRhFGOTHGsf51pbkFaYn007W0sV5eb"
  );
  
const app =express()
app.use(express.json())
app.use(cors({origin:true}));
app.get('/',(req,res)=>{
    res.send("hello world")
})
app.post("/payments/create", async (request, response) => {
    const total = request.query.total;
  
    console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
  
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total, // subunits of the currency
      currency: "usd",
    });
  
    // OK - Created
    response.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  });
  
exports.api = functions.https.onRequest(app);
