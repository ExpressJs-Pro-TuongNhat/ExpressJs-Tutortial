export const createUserValidationSchema = {
    username: {
        isLength: {
            options: { min: 3, max: 32 },
            errorMessage: "Username must be between 3 and 32 characters.",
        },
        notEmpty: {
            errorMessage: "Username is required.",
        },
        isString: {
            errorMessage: "Username must be a string."
        },
        trim: true,
    },
    displayName: {
        notEmpty: {
            errorMessage: "Display name is required.",
        },
        isString: {
            errorMessage: "Display name must be a string."
        },
        trim: true,
    }
};