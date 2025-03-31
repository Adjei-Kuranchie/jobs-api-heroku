require("dotenv").config();
require("express-async-errors");
const express = require("express");

// security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

// Swagger
const path = require("node:path");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load(path.join(__dirname, "./swagger.yaml"));

const swaggerOptions = {
  customCssUrl: "https://unpkg.com/swagger-ui-dist@4/swagger-ui.css",
  customJs: [
    "https://unpkg.com/swagger-ui-dist@4/swagger-ui-bundle.js",
    "https://unpkg.com/swagger-ui-dist@4/swagger-ui-standalone-preset.js",
  ],
};

const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

const connectDB = require("./db/connect");

const app = express();

// middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const authenticateUser = require("./middleware/authentication");

app.use(express.json());

// extra packages
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send(`<h1>Jobs API</h1><a href="/api-docs">Documentation</a>`);
});

app.use(
  "/api-docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDocument, swaggerOptions)
);

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
