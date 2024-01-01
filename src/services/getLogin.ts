import axios from "axios";

export async function getLogin({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const serverUri = process.env.SERVER_URI;

  if (!serverUri) throw new Error("SERVER_URI is not defined");

  const accountInfo = await axios
    .postForm(serverUri + "/player_api.php", { username, password })
    .then((res) => res.data)
    .catch((err) => null);

  const activeConnections = accountInfo?.user_info?.active_cons;

  if (activeConnections && activeConnections > 1) {
    return null;
  }

  return accountInfo;
}
