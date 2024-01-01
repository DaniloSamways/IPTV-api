import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./controller";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

const uri = process.env.DB_URI!;
export const db = new MongoClient(uri).db("iptv");

app.use(router);

app.listen(3333, () => {
  console.log("Server is running on port 3333!");
});
