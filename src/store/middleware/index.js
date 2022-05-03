const loggerMiddleware = (store) => (next) => (action) => {
  // TODO: basic middleware 
  next(action);
};

export default loggerMiddleware;