const mongoose = require("mongoose");

const litterSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  petname: {
    type: String,
    required: true,
  },
  breed: {
    type: String,
  },
  request: { type: String },

  adoptStatus: {
    type: String,
  },
  weight: {
    type: String,
  },
  price: {
    type: Number,
  },
  birthdate: {
    type: Date,
  },

  location: [Number],
  image: { type: String },
});

module.exports = mongoose.model("Litter", litterSchema);
















/*


how can i find count: => change the request to  requests [] that contains an array of users and then find length. // saturday night.
request: [{message: {type: string}}]
backend: router.put('/'requestscount/:id", async (req, res)=>{
  const doc = await Litter.updateOne({
    _id: req.params
  }, {$push: {requests: req.body}})
  res.json ({sucess: true, data: litter})

})

*/