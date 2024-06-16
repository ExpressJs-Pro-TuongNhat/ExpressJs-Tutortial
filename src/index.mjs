import express, { request, response } from 'express';

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

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

app.get("/api/users", (request, response) => {
  console.log(request.query);
  const { query: { filter, value } } = request;
  if (filter && value) {
    return response.send(
      mockUsers.filter((user) => user[filter].includes(value))
    );
  }
  return response.send(mockUsers);
});

app.post("/api/users", (request, response) => {
  console.log(request.body);
  const { body } = request;
  const newUser = {
    id: mockUsers.length + 1,
    ...body
  };
  mockUsers.push(newUser);
  return response.status(201).send(newUser);
})

app.put("/api/users/:id", (request, response) => {
  const {
    params: { id },
    body,
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId))
    return response.status(400).send({ msg: "Bad request. Invalid ID." });
  const findIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findIndex === -1)
    return response.status(404).send({ msg: "User not found." });
  mockUsers[findIndex] = { id: parsedId, ...body };
  return response.status(200).send({ msg: "User updated successfully.", user: mockUsers[findIndex] });
});

app.patch("/api/users/:id", (request, response) => {
  const {
    params: { id },
    body,
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.status(400).send({ msg: "Bad request. Invalid ID." });
  const findIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findIndex === -1) return response.status(404).send({ msg: "User not found." });
  mockUsers[findIndex] = { ...mockUsers[findIndex], ...body };
  return response.status(200).send({ msg: "User updated successfully.", user: mockUsers[findIndex] });
})

app.delete("/api/users/:id", (request, response) => {
  const {
    params: { id }
  } = request;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return response.status(400).send({ msg: "Bad request. Invalid ID." });
  const findIndex = mockUsers.findIndex((user) => user.id === parsedId);
  if (findIndex === -1) return response.status(404).send({ msg: "User not found." });
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