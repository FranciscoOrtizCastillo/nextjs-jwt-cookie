import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Query = {
    ping() {
      return "pong";
    },
    users() {
        console.log(`resolver: users`)
        //return [{firstname: 'Admin' }, { firstname: 'User' }, { firstname: 'Customer' }]
        return prisma.user.findMany();
      },
  };
  
  export default Query;