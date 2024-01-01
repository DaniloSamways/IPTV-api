import { ObjectId } from "mongodb";
import { db } from "../server";
import { getLogin } from "./getLogin";

export async function getWorkingAccount(uuid: string) {
  const accountsTable = db.collection("accounts");

  const accounts = (await accountsTable
    .find()
    .limit(100)
    .toArray()) as unknown as {
    username: string;
    password: string;
    active_user?: string;
  }[];
  let workingAccount = null;

  for (let account of accounts) {
    const { username, password, active_user } = account;

    if (!!active_user && String(uuid) !== String(active_user)) {
      continue;
    }

    const isValid = await getLogin({ username, password });
    if (isValid) {
      workingAccount = { account, data: isValid };
      break;
    }
  }

  return workingAccount;
}
