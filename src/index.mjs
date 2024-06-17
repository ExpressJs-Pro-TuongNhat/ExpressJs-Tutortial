import express from 'express';
import routers from './routes/index.mjs';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser("secret"));
app.use(routers);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
}

app.use(loggingMiddleware, (request, response, next) => {
  console.log("Finish Logging ----------------------------------");
  next();
});

app.get("/", (request, response) => {
  response.cookie("hello", "word", { maxAge: 10000, signed: true });
  response.status(201).send({ msg: 'Hello' });
});
