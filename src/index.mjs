import express, { request, response } from 'express';
import { query, validationResult, body, matchedData } from 'express-validator';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const loggingMiddleware = (request, response, next) => {
  console.log(`${request.method} - ${request.url}`);
  next();
}

const resolveIndexUserById = (request, response, next) => {
  const { params: { id } } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.status(400).send({ msg: "Bad request. Invalid ID." });
  const findIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findIndex === -1) return response.status(404).send({ msg: "User not found." });
  request.findIndex = findIndex;
  next();
};

app.use(loggingMiddleware, (request, response, next) => {
  console.log("Finish Logging ----------------------------------");
  next();
});

const mockUsers = [
  {
    id: 1,
    username: "John",
    displayName: "Doe",
  },
  {
    id: 2,
    username: "Jane",
    displayName: "Doe",
  },
  {
    id: 3,
    username: "Alice",
    displayName: "Smith",
  },
  {
    id: 4,
    username: "Bob",
    displayName: "Johnson",
  },
  {
    id: 5,
    username: "Charlie",
    displayName: "Williams",
  },
  {
    id: 6,
    username: "David",
    displayName: "Brown",
  },
  {
    id: 7,
    username: "Eve",
    displayName: "Davis",
  },
  {
    id: 8,
    username: "Frank",
    displayName: "Miller",
  },
  {
    id: 9,
    username: "Grace",
    displayName: "Wilson",
  },
  {
    id: 10,
    username: "Henry",
    displayName: "Moore",
  },
];

app.get("/", (request, response) => {
  response.status(201).send({ msg: 'Hello' });
});

app.get(
  "/api/users",
  query("filter")
    .isLength({ min: 3, max: 10 }).withMessage("Filter must be between 3 and 10 characters.")
    .isString().withMessage("Filter must be a string.")
    .notEmpty().withMessage("Filter is required.")
    .trim(),
  (request, response) => {
    const result = validationResult(request);
    const { query: { filter, value } } = request;
    if (filter && value) {
      return response.send(
        mockUsers.filter((user) => user[filter].includes(value))
      );
    }
    return response.send(mockUsers);
  });

app.post(
  "/api/users",
  [
    body("username")
      .isLength({ min: 3, max: 32 }).withMessage("Username must be between 3 and 10 characters.")
      .isString().withMessage("Username must be a string.")
      .notEmpty().withMessage("Username is required."),
    body("displayName").notEmpty().withMessage("Display name is required.")
  ],
  (request, response) => {
    const data = matchedData(request);
    const result = validationResult(request);
    if(!result.isEmpty()) {
      return response.status(400).send({ msg: "Validation failed.", errors: result.array() });
    }
    const newUser = {
      id: mockUsers.length + 1,
      ...data
    };
    mockUsers.push(newUser);
    return response.status(201).send(newUser);
  })

app.put("/api/users/:id", resolveIndexUserById, (request, response) => {
  const { findIndex, body } = request;
  mockUsers[findIndex] = { id: mockUsers[findIndex].id, ...body };
  return response.status(200).send({ msg: "User updated successfully.", user: mockUsers[findIndex] });
});

app.patch("/api/users/:id", resolveIndexUserById, (request, response) => {
  const { findIndex, body } = request;
  mockUsers[findIndex] = { ...mockUsers[findIndex], ...body };
  return response.status(200).send({ msg: "User updated successfully.", user: mockUsers[findIndex] });
})

app.delete("/api/users/:id", resolveIndexUserById, (request, response) => {
  const { findIndex } = request;
  mockUsers.splice(findIndex, 1);
  return response.status(200).send({ msg: "User deleted successfully.", user: mockUsers });
})

app.get("/api/users/:id", (request, response) => {
  console.log(request.params);
  const parsedId = parseInt(request.params.id);
  if (isNaN(parsedId)) {
    return response.status(400).send({ msg: "Bad request. Invalid ID." })
  }
  const findUser = mockUsers.find((user) => user.id === parsedId);
  if (!findUser) {
    return response.sendStatus(404).send({ msg: "User not found." })
  }
  return response.send(findUser);
})

app.get("/api/products", (request, response) => {
  response.send([
    {
      id: 1,
      name: "Product 1",
      price: 100,
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
    },
    {
      id: 3,
      name: "Product 3",
      price: 30,
    }
  ])
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});