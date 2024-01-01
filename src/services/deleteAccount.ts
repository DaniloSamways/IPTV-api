import { db } from "../server";

export async function deleteAccount({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  if (!username || !password) return false;
  const accountsTable = db.collection("accounts");
  const rowIndex = await accountsTable.findOne({ username, password });
  if (!rowIndex) return false;

  const response = await accountsTable
    .deleteOne(rowIndex)
    .then(() => true)
    .catch(() => false);
  return response;
}
