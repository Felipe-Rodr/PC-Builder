import { deleteCookie, setCookie } from 'cookies-next';
import { z } from 'zod'
import { createRouter } from '../createRouter'

export const userRouter = createRouter()
    .mutation('registrarUser', {
        input: z.object({
            username: z.string(),
            password: z.string()
        }),
        async resolve({ctx, input}){
            try{
                const User = await ctx.prisma.user.create({
                    data:input
                });
                if(!User){
                    throw new Error('User não pôde ser criado.');
                }
                setCookie(
                    'sessionPCBuilder',
                    encodeURIComponent(User.id),
                    {
                        req: ctx.req,
                        res: ctx.res,
                        maxAge: 60*10*6,
                        sameSite: 'none',
                        secure: true,
                    }
                );
                return 'Usuário registrado com sucesso.'
            } catch {
                throw new Error("Username já está sendo usado.")
            }
        }
    })
    .mutation('LoginUser', {
        input: z.object({
            username: z.string().optional(),
            password: z.string().optional()
        }),
        async resolve({ctx, input}){
            const User = await ctx.prisma.user.findFirst({
                where: {
                    username:input.username
                }
            });
            if(!User){
                throw new Error('Usuário não existe.');
            }
            if(User.password === input.password){
                setCookie(
                    'sessionPCBuilder',
                    encodeURIComponent(User.id),
                    {
                        req: ctx.req,
                        res: ctx.res,
                        maxAge: 60*10*6,
                        sameSite: 'none',
                        secure: true,
                    }
                );
                return 'Login realizado com sucesso.'
            } else {
                throw new Error('Senha incorreta.')
            }
        }
    })
    .mutation('desconectarUser',{
        resolve({ctx}){
            deleteCookie('sessionPCBuilder',{
                req: ctx.req,
                res: ctx.res
            });
            return;
        }
    })
    .query('findUsername',{
        input: z.object({
            userId: z.string().uuid()
        }),
        async resolve({ctx,input}){
            const User = await ctx.prisma.user.findUnique({
                where: {
                    id: input.userId
                }
            });
            if(!User){
                return ''
            }
            return User.username;
        }
    })
    .query('findUserPCs', {
        input: z.object({
            userId: z.string().uuid()
        }),
        async resolve({ctx,input}){
            const UserPCs = await ctx.prisma.user.findUnique({
                where: {
                    id: input.userId
                },
                select:{
                    pcs: true
                }
            });
            if(!UserPCs){
                throw new Error('PCs não encontrados ou não possui nenhum PC.')
            }
            return UserPCs;
        }
    })