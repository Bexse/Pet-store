const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const app = express();
const litterRouter = require("./routes/litter");
const userRouter = require("./routes/user");
const Litter = require("./models/litterModel");
const userController = require("./controllers/user");
const path = require("path");

mongoose.connect("mongodb://0.0.0.0:27017/furever-db", (err) => {
  if (err) {
    console.log("Database Error: " + err.message);
  } else {
    console.log("Database Connected Successfully");
  }
});

app.use(express.json());
app.use(cors());
app.use("/api/litters", litterRouter);
app.use("/api/users", userRouter);
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./uploads/");
  },
  filename: (req, file, callBack) => {
    callBack(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post(
  "/api/litters/add",
  userController.middleware,
  upload.single("image"),
  async (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const document = await Litter.create({
      ...req.body,
      image: url + "/uploads/" + req.file.filename,
      user: req.user._id,
    });
    res.json({ success: true, data: document });
  }
);

app.use((err, req, res, next) => {
  if (err && err.message) {
    res.send(err.message);
  } else {
    res.send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log(`listening on port 3000...`);
});
