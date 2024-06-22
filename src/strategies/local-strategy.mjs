import passport from "passport";
import { Strategy } from "passport-local";
import { mockUsers } from "../utils/constants.mjs";


passport.serializeUser((user, done) => {
    done(null, user.id);
    // done(null, user );
});

passport.deserializeUser((id, done) => {
    console.log("ID: ", id);
    try {
        const findUser = mockUsers.find(user => user.id === id);
        if (!findUser) throw new Error("User not found");
        done(null, findUser);
    } catch (err) {
        done(err, null);
    }
});

passport.use(
    new Strategy((username, password, done) => {
        try {
            console.log("Username: ", username);
            console.log("Password: ", password);
            const findUser = mockUsers.find(user => user.username === username);
            if (!findUser) throw new Error("User not found");
            if (findUser.password !== password) throw new Error("Password not match");
            done(null, findUser);
        } catch (err) {
            done(err, null);
        }
    })
);

export default passport