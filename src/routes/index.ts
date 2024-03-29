import { Router } from "express";
import TaskRoutes from './task/task.routes'

const routes = Router()

routes.use('/task',TaskRoutes)

export default routes  