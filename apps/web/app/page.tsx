
import {prisma} from "@repo/db"


export default async function Home(){

  const user = await prisma.user.findFirst();

  return <div>
    <h1> hello how are you</h1>
     <div>
      {user?.email}
      {user?.Username}
     </div>
  </div>

}