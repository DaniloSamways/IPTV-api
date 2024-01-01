import { db } from "../server";

export async function setActiveIptv({
  username,
  password,
  iptvCredentials,
}: {
  username: string;
  password: string;
  iptvCredentials: { username: string; password: string };
}) {
  const usersTable = db.collection("users");
  const accountTable = db.collection("accounts");
  const user = await usersTable.findOne({ username, password });
  const updateUser = await usersTable
    .updateOne(
      { username, password },
      { $set: { activeIptv: iptvCredentials } }
    )
    .then(() => true)
    .catch(() => false);
  const updateAccount = await accountTable
    .updateOne(
      {
        username: iptvCredentials.username,
        password: iptvCredentials.password,
      },
      { $set: { active_user: user?._id } }
    )
    .then(() => true)
    .catch(() => false);

  return updateUser && updateAccount;
}
