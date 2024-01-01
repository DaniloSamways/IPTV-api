import { db } from "../server";
import { getLogin } from "./getLogin";

export async function saveAccount({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  if (!username || !password) return false;
  const workingAccount = await getLogin({ username, password });
  if (!workingAccount) return false;

  const accountsTable = db.collection("accounts");
  const alreadyExists = await accountsTable.findOne({
    username,
    password,
  });

  if (alreadyExists) return false;

  const response = await accountsTable
    .insertOne({ username, password, activeIptv: null })
    .then(() => true)
    .catch(() => false);
  return response;
}
