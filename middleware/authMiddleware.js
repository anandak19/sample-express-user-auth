const usersList = [
  {
    username: "anandan",
    password: "anan",
  },
  {
    username: "nikhil",
    password: "n123",
  },
  {
    username: "sam",
    password: "sam",
  },
];

module.exports = (req, res, _next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.redirect("/login?alertMessage=Enter Username and Password");
  } else {
    const foundUser = usersList.find((e) => e.username === username);
    if (foundUser) {
      if (foundUser.password === password) {
        req.session.user = req.body.username;
        res.redirect("/");
      } else {
        res.redirect("/login?alertMessage=Password incorrect");
      }
    } else {
      res.redirect("/login?alertMessage=Invalid username or password");
    }
  }
};
