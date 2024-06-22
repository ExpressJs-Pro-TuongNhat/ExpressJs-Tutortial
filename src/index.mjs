import express, { request, response } from 'express';
import routers from './routes/index.mjs';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { mockUsers } from './utils/constants.mjs';
import passport from 'passport';
import './strategies/local-strategy.mjs';

const app = express();

app.use(express.json());
app.use(cookieParser("secret"));
app.use(session({
  secret: "nhat dev",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60000 * 60,
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(routers);

app.post(
  "/api/auth",
  passport.authenticate("local"),
  (request, response) => {
    response.sendStatus(200);
  }
);

app.post("/api/auth/logout", (request, response) => {
  if(!request.user) return response.sendStatus(401);
  request.logout((err) => {
    if(err) return response.sendStatus(400);
    response.sendStatus(200);
  })
});

app.get("/api/auth/status", (request, response) => {
  return request.user ? response.send(request.user) : response.sendStatus(401);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const loggingMiddleware = (request, response, next) => {
//   console.log(`${request.method} - ${request.url}`);
//   next();
// }

// app.use(loggingMiddleware, (request, response, next) => {
//   console.log("Finish Logging ----------------------------------");
//   next();
// });

// app.get("/", (request, response) => {
//   console.log("Session: ", request.session);
//   console.log("Session ID: ", request.session.id);
//   request.session.visited = true;
//   response.cookie("hello", "word", { maxAge: 30000, signed: true });
//   response.status(201).send({ msg: 'Hello' });
// });

// app.post("/api/auth", (request, response) => {
//   const { body: { username, password } } = request;
//   const findUser = mockUsers.find((user) => user.username === username);
//   if (!findUser || findUser.password !== password) {
//     return response.status(401).send({ msg: "Invalid username or password" });
//   } else {
//     request.session.user = findUser;
//     return response.status(200).send({ msg: "Login success", user: findUser });
//   }
// });

// app.get("/api/auth/status", (request, response) => {
//   request.sessionStore.get(request.sessionID, (err, session) => {
//     console.log("Session: ", session);
//   });
//   return request.session.user ? response.status(200).send(request.session.user) : response.status(401).send({ msg: "Not Authenticated" });
// })

// app.post("/api/cart", (request, response) => {
//   if (!request.session.user) {
//     return response.status(401).send({ msg: "Not Authenticated" });
//   }
//   const item = request.body;
//   console.log("Item: ", item);
//   const { cart } = request.session;
//   if (cart) {
//     cart.push(item);
//   }
//   else {
//     request.session.cart = [item];
//   }
//   return response.status(200).send({ msg: "Added to cart", cart });
// })

// app.get("/api/cart", (request, response) => {
//   if (!request.session.user) {
//     return response.status(401).send({ msg: "Not Authenticated" });
//   }
//   return response.send(request.session.cart ?? []);
// })