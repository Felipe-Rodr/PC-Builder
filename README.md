PC Builder se trata de um "mock project". Isto é, seria um projeto feito para uma empresa fictícia que lidaria com a montagem de computadores, logo este seria o pretexto para a criação deste website.

  Este projeto teve como intuito aprender e aprimorar minhas habilidades e conceitos sobre a criação de websites/webapps que se encontram integrados com bancos de dados, assim como desenvolver meu entendimento sobre React e Typescript.

  No geral, foi uma boa experiência programar este projeto. Infelizmente não pude integrar também uma API como fonte de dados para as peças de um computador pela falta de existir uma API pública para isso.

Frameworks e libraries utilizados:
    - Typescript
    - React
    - Tailwind e daisyUI
    - Postgresql
    - Prisma
    - Trpc

Como rodar este repo:
    Requerimentos:
        - Node.js -v 16.x+
        - Postgresql database

Passos:
    - Clone o repositório
    - Digite no terminal "npm install" para instalar as dependências
    - crie um arquivo ".env" com o seguinte:
        DATABASE_URL:(url do seu banco de dados postgresql)
    - Digite no terminal "npx prisma db push" e depois "npm run dev"
    - Veja o projeto em localhost:3000/