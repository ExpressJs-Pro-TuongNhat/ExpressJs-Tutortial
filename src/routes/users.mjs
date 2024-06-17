import { Router } from "express";
import { query, validationResult, matchedData, checkSchema } from "express-validator";
import { mockUsers } from "../utils/constants.mjs";
import { createUserValidationSchema } from "../utils/validationShemas.mjs";
import { resolveIndexUserById } from "../utils/middlewares.mjs";


const router = Router();    
router.get(
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
    }
);

router.get("/api/users/:id", (request, response) => {
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
});

router.post(
    "/api/users",
    checkSchema(createUserValidationSchema),
    (request, response) => {
        const data = matchedData(request);
        const result = validationResult(request);
        if (!result.isEmpty()) {
            return response.status(400).send({ msg: "Validation failed.", errors: result.array() });
        }
        const newUser = {
            id: mockUsers.length + 1,
            ...data
        };
        mockUsers.push(newUser);
        return response.status(201).send(newUser);
    }
);

router.put("/api/users/:id", resolveIndexUserById, (request, response) => {
    const { findIndex, body } = request;
    mockUsers[findIndex] = { id: mockUsers[findIndex].id, ...body };
    return response.status(200).send({ msg: "User updated successfully.", user: mockUsers[findIndex] });
}
);

router.patch("/api/users/:id", resolveIndexUserById, (request, response) => {
    const { findIndex, body } = request;
    mockUsers[findIndex] = { ...mockUsers[findIndex], ...body };
    return response.status(200).send({ msg: "User updated successfully.", user: mockUsers[findIndex] });
})

router.delete("/api/users/:id", resolveIndexUserById, (request, response) => {
    const { findIndex } = request;
    mockUsers.splice(findIndex, 1);
    return response.status(200).send({ msg: "User deleted successfully.", user: mockUsers });
})

export default router;