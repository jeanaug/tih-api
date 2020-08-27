import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MONGODB_URI } from "./util/secrets";
import { routes } from "./routes";
var cors = require("cors");
//Create express server
const app = express();

//Enable cors
app.use(cors());

//Express configuration
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Connect to MongoDB
mongoose.connect(
  MONGODB_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log(err);
    }
  }
);
mongoose.set("useFindAndModify", false);

routes(app);

export default app;
