import { Router } from "express";

import order from "./middlewares/order.js";
import hateoas from "./middlewares/hateos.js";
import handler from "./middlewares/handler.js";

import InternalServerError from "./routers/helpers/500.js"
import NotFound from "./routers/helpers/404.js";

import AuthRouter from "./routers/authRouter.js";
import UserRouter from "./routers/userRouter.js";
import ProductsRouter from "./routers/productRouter.js";
import TaskRouter from "./routers/taskRouter.js";
import OrderRouter from "./routers/orderRouter.js";
import DebtorRouter from "./routers/debtorRouter.js";

import { verify } from "./controllers/authController.js";

const routes = Router();
routes.use(order);
routes.use(hateoas);
routes.use(handler);

routes.use("/login", AuthRouter);
routes.use("/api/tasks", TaskRouter);
routes.use("/api/debtors", DebtorRouter)
routes.use("/api/orders", OrderRouter)
routes.use("/api", verify, UserRouter, ProductsRouter);

routes.use(InternalServerError);
routes.use(NotFound);

export default routes;