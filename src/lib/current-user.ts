import { auth } from "@clerk/nextjs/server";
import prisma from "./prisma";

export const currentUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const profile = await prisma.user.findUnique({
    where: {
      clerkId: userId,
    },
  });

  return profile;
};
