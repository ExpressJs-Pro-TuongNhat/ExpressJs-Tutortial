import { mockUsers } from "./constants.mjs";

export const resolveIndexUserById = (request, response, next) => {
    const { params: { id } } = request;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) return response.status(400).send({ msg: "Bad request. Invalid ID." });
    const findIndex = mockUsers.findIndex((user) => user.id === parsedId);
    if (findIndex === -1) return response.status(404).send({ msg: "User not found." });
    request.findIndex = findIndex;
    next();
  };