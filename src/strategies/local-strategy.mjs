import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/constants.mjs";
import { User } from "../mongoose/schemas/User.mjs";


passport.serializeUser((user, done) => {
    done(null, user.id);
    // done(null, user );
});

passport.deserializeUser(async (id, done) => {
    console.log("ID: ", id);
    try {
        const findUser = await User.findById(id);
        if (!findUser) throw new Error("User not found");
        done(null, findUser);
    } catch (err) {
        done(err, null);
    }
});

passport.use(
    new Strategy(async (username, password, done) => {
        try {
            const findUser = await User.findOne({ username });
            if (!findUser) throw new Error("User not found");
            if (findUser.password !== password) throw new Error("Password not match");
            done(null, findUser);
        } catch (err) {
            done(err, null);
        }
    })
);

export default passport