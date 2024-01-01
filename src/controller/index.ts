import { Router } from "express";
import { getLogin } from "../services/getLogin";
import { getAccountChannels } from "../services/getAccountChannels";
import { saveAccount } from "../services/saveAccount";
import { deleteAccount } from "../services/deleteAccount";
import { getUserLogin } from "../services/getUserLogin";
import { getWorkingAccount } from "../services/getWorkingAccount";
import { setActiveIptv } from "../services/setActiveIptv";

const router = Router();

router.post("/save", async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const { username, password } = req.body;

  if (!username || !password) return res.sendStatus(400);

  const account = await saveAccount({ username, password });
  if (!account) return res.sendStatus(401);

  return res.sendStatus(200);
});

router.delete("/delete", async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const { username, password } = req.body;

  if (!username || !password) return res.sendStatus(400);

  const account = await deleteAccount({ username, password });
  if (!account) return res.sendStatus(401);

  return res.sendStatus(200);
});

router.get("/get.php", async (req, res) => {
  console.log("chegou");
  const { username, password } = req.query as {
    username: string;
    password: string;
  };

  if (!username || !password) return res.sendStatus(400);
  const accountUUID = await getUserLogin({ username, password });
  if (!accountUUID) return res.sendStatus(401);

  const workingAccount = await getWorkingAccount(
    accountUUID as unknown as string
  );
  if (!workingAccount) return res.sendStatus(401);

  const channels = await getAccountChannels({
    username: workingAccount.account.username,
    password: workingAccount.account.password,
  });

  if (!channels) return res.sendStatus(401);

  return res.json(channels);
});

router.post("/player_api.php", async (req, res) => {
  console.log("chegou");
  if (!req.body) return res.sendStatus(400);

  const { username, password } = req.body;

  if (!username || !password) return res.sendStatus(400);

  const accountUUID = await getUserLogin({ username, password });
  if (!accountUUID) return res.sendStatus(401);

  const workingAccount = await getWorkingAccount(
    accountUUID as unknown as string
  );
  if (!workingAccount) return res.sendStatus(401);
  const active = await setActiveIptv({
    username,
    password,
    iptvCredentials: workingAccount.account,
  });
  if (!active) return res.sendStatus(401);
  return res.json(workingAccount.data);
});

export default router;
