import axios from "axios";

export async function getAccountChannels({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const serverUri = process.env.SERVER_URI;

  if (!serverUri) throw new Error("SERVER_URI is not defined");

  const accountInfo = await axios
    .get(`${serverUri}/get.php?username=${username}&password=${password}`)
    .then((res) => res.data)
    .catch((err) => null);

  return accountInfo;
}
