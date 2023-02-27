//require('express-async-errors');
require("dotenv").config();
const httpStatus = require("http-status");
const config = require("config");
const mongoose = require("mongoose");
const customers = require("./routes/customers");
const auth = require("./routes/auth");
const product = require("./routes/product");
const blog = require("./routes/blog");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");

const ApiError = require("./global/ApiError");
const { errorConverter, errorHandler } = require("./global/errorFormater");

const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}
const CLOUD_PASSWORD = process.env.CLOUD_PASSWORD;
const CLOUD_DB = `mongodb+srv://Jango601:${CLOUD_PASSWORD}@cluster0.py9ld.mongodb.net/test?retryWrites=true&w=majority`;
const otherOptions = {
  useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false, 
}
const DB_URL = process.env.DB_URL;
console.log('------------------------------------')
console.log(`DB_URL = ${DB_URL}`)
console.log('------------------------------------')
mongoose
  .connect(`${DB_URL}`, {})
  .then(() => {
    console.log('******************************************')
    console.log("Connected to MongoDB...")
console.log('******************************************')
    })
  .catch((err) => { console.log(err); console.error("Could not connect to MongoDB...")});

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

const corsOptions = {
  exposedHeaders: "x-auth-token",
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(cors(corsOptions));
app.use("/api/customers", customers);
app.use("/api/user", auth);
app.use("/api/product", product);
app.use("/api/blogs", blog);


// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

app.use(errorConverter);
app.use(errorHandler);

const port = process.env.PORT || 3010;
app.listen(port, () => console.log(`Listening on port ${port}...`));
