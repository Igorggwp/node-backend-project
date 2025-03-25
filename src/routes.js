import { Router } from "express";

import InternalServerError from "./routers/helpers/500.js"
import NotFound from "./routers/helpers/404.js";

import UserRouter from "./routers/userRouter.js";
import ProductsRouter from "./routers/productRouter.js";

const api = Router()
  .use("/users/", UserRouter)
  .use("/products/", ProductsRouter);

const routes = Router()
  .use("/api/", api)
  .use(InternalServerError)
  .use(NotFound);

export default routes;