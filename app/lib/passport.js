import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import axios from "axios";

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        const response = await axios.post(
          "https://mothership.wordifysites.com/wp-json/jwt-auth/v1/token",
          { username, password }
        );

        if (response.data && response.data.token) {
          const user = {
            id: response.data.user_id,
            username: response.data.user_nicename,
            email: response.data.user_email,
            token: response.data.token,
          };

          return done(null, user);
        } else {
          return done(null, false, { message: "Invalid credentials" });
        }
      } catch (error) {
        return done(null, false, { message: "Authentication failed" });
      }
    }
  )
);

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user from session
passport.deserializeUser((user, done) => {
  done(null, user);
});

export default passport;
