# Nextjs Autenticación con Json Web Tokens (JWT), y Rutas Protegidas con Middlewares

## Next.js

```
npx next --version

npx create-nest-app nextjs-jwt-cookie
cd nextjs-jwt-cookie

# Si se clona el repositorio
# npm install

npm i jsonwebtoken
npm i cookie
npm install bootstrap

```

https://mdbootstrap.com/docs/standard/extended/login/#section-7

## Authorization
https://nextjs.org/docs/advanced-features/middleware

https://blog.tericcabrel.com/protect-your-api-routes-in-next-js-with-middleware/

```
# -L para mostrar el contenido de la redireccion
curl -X GET http://localhost:3000/api/private/hello -L   
```

## Internationalized routing

```
npm install next-translate
```

https://github.com/aralroca/next-translate
https://blog.flycode.com/step-by-step-how-to-internationalize-your-nextjs-app-with-next-translate

## GraphQL Server

https://github.com/vercel/next.js/tree/canary/examples/api-routes-graphql

https://www.graphql-yoga.com/docs/quick-start

```
npm install graphql @graphql-yoga/node
npm install @envelop/graphql-middleware --force

npm install swr
```

## ORM Prisma

```
npm install -D prisma
npm install @prisma/client

npx prisma init

npx prisma migrate dev --name init

npm install uuid

# Abre el studio en http://localhost:5555
npx prisma studio
```

https://medium.com/dooboolab/start-using-prisma-in-your-existing-database-with-prisma-introspection-334a96701bab

## CSRF (Cross-Site Request Forgery)

https://www.npmjs.com/package/next-csrf

```
npm i next-csrf

curl -X POST http://localhost:3000/api/graphql
{"message":"Invalid CSRF token"}       

```

## Tablas

https://github.com/TanStack/table
@tanstack/react-table


https://react-table-library.com/?path=/story/getting-started-installation--page

```
npm install @table-library/react-table-library @emotion/react
```

## Log

https://getpino.io/#/

```
npm install pino
npm install pino-pretty
```

## Test
