import { deleteCookie, setCookie } from 'cookies-next';
import { z } from 'zod'
import { createRouter } from '../createRouter'

export const pcRouter = createRouter()
    .mutation('criarPc',{
        input: z.object({
            userId: z.string().uuid(),
            nome: z.string(),
            partes: z.string().array(),
            partesTipos: z.string().array()
        }),
        async resolve({ctx,input}){
            try{
                const Pc = await ctx.prisma.user.update({
                    where: {
                        id: input.userId
                    },
                    data:{
                        pcs: {
                            create: {
                                nome: input.nome,
                                partes: input.partes,
                                partesTipos: input.partesTipos
                            }
                        }
                    }
                });
            } catch {
                throw new Error('Nome deste PC já está sendo usado.')
            }
            setCookie(
                'sessionPCBuilder',
                encodeURIComponent(input.userId),
                {
                    req: ctx.req,
                    res: ctx.res,
                    maxAge: 60*10*6,
                    sameSite: 'none',
                    secure: true,
                }
            );
            return 'PC Criado com sucesso!'
        }
    })
    .mutation('atualizarPc',{
        input: z.object({
            userId: z.string().uuid(),
            nome: z.string(),
            partes: z.string().array(),
            partesTipos: z.string().array()
        }),
        async resolve({ctx, input}){
            const PC = await ctx.prisma.pc.update({
                where: {
                    autorId_nome: {
                        autorId: input.userId,
                        nome: input.nome
                    }
                },
                data: {
                    partes: input.partes,
                    partesTipos: input.partesTipos
                }
            })
            if(!PC){
                throw new Error("PC não pôde ser atualizado.");
            }
            setCookie(
                'sessionPCBuilder',
                encodeURIComponent(input.userId),
                {
                    req: ctx.req,
                    res: ctx.res,
                    maxAge: 60*10*6,
                    sameSite: 'none',
                    secure: true,
                }
            );
            return 'PC atualizado com sucesso.'
        }
    })
    .mutation('deletarPc',{
        input: z.object({
            userId: z.string().uuid(),
            nome: z.string(),
        }),
        async resolve({ctx, input}){
            const PC = await ctx.prisma.pc.delete({
                where: {
                    autorId_nome: {
                        autorId: input.userId,
                        nome: input.nome
                    }
                }
            })
            if(!PC){
                throw new Error("PC não pôde ser deletado.");
            }
            setCookie(
                'sessionPCBuilder',
                encodeURIComponent(input.userId),
                {
                    req: ctx.req,
                    res: ctx.res,
                    maxAge: 60*10*6,
                    sameSite: 'none',
                    secure: true,
                }
            );
            return 'PC deletado com sucesso.'
        }
    })