
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const Mutation = {
    saveUser: async (_, { user }) => {
        //console.log('saveUser',user)
        try {
          const userSaved = await prisma.user.create({
                data: {
                  id: uuidv4(),
                  firstname: user.firstname,
                  lastname: user.lastname,
                  email: '',
                }})
          console.log(userSaved)
          return userSaved
        } catch (e) {
          return e.message;
        }
        finally {
          await prisma.$disconnect()
          console.log('prisma.$disconnect()')
        }
    },
  };
  
  export default Mutation;