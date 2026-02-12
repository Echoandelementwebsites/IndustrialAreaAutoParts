import { currentUser } from "@clerk/nextjs/server";

export async function checkIsAdmin() {
  const user = await currentUser();
  if (!user) return false;

  const adminEmails = (process.env.ADMIN_EMAILS || "").split(",");

  const userEmails = user.emailAddresses.map(email => email.emailAddress);

  return userEmails.some(email => adminEmails.includes(email));
}
