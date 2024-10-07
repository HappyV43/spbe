// import prisma from "@/lib/db";
// import { RawData } from "@prisma/client";
// import { revalidatePath } from "next/cache";

// export async function createData(data: RawData) {
//   try {
//     const user = await prisma.rawData.create({
//       data: {
//         no: data.no

//       },
//     });
//     revalidatePath("/");
//     return user;
//   } catch (error) {
//     console.log(error);
//   }
// }
// export async function createBulkUsers(users: RawData[]) {
//   try {
//     for (const user of users) {
//       await createUser(user);
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }
