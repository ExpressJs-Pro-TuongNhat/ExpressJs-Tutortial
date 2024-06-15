import express, { request, response } from 'express';

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (request, response) => {
    response.status(201).send({ msg: 'Hello' });
});

app.get("/api/users", (request, response) => {
  response.send([
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
  ]);
});

app.get("/api/products", (request, response) =>{
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