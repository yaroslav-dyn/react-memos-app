import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import loggerMiddleware from "./middleware"

const middleware = applyMiddleware(loggerMiddleware);

const store = createStore(rootReducer, middleware);

export default store;