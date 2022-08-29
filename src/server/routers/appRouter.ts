import { createRouter } from '../createRouter'
import { pcRouter } from './pcRouter';
import { userRouter } from './userRouter';


export const appRouter = createRouter()
    .merge('user.', userRouter)
    .merge('pc.', pcRouter)
;
// export type definition of API
export type AppRouter = typeof appRouter;