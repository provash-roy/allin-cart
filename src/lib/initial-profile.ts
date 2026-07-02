import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./prisma";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const profile = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  });

  if (profile) {
    return profile;
  }

  const newProfile = await prisma.user.create({
    data: {
      clerkId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.emailAddresses[0]?.emailAddress || "",
      image: user.imageUrl,
    },
  });
  return newProfile;
};
