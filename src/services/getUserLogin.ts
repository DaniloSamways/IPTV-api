import { db } from "../server";

export async function getUserLogin({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const usersTable = db.collection("users");
  const isValid = await usersTable
    .findOne({ username, password })
    .then((res) => res?._id)
    .catch(() => false);

  return isValid;
}
