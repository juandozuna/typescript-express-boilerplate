const TYPES = {
  Router: Symbol.for('Router'),
  Controller: Symbol.for("Controller"),
  Repos: {
    Todo: Symbol.for("TodoRepository"),
    User: Symbol.for("UserRepository")
  },
  DataSource: {
    Todo: Symbol.for("TodoDataSource"),
    User: Symbol.for("UserDataSource")
  },
  Services: {
    PasswordHasher: Symbol.for("PasswordHasherService"),
    Token: Symbol.for("TokenService")
  }
};


export default TYPES;