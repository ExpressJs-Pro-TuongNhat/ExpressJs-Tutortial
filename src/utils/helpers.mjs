import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    console.log(salt);
    return await bcrypt.hash(password, salt);
};

export const comparePassword = (plain, hashed) => bcrypt.compareSync(plain, hashed);
