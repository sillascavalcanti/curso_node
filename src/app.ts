import express from "express";
import { routerLoader } from "./routerLoader";

const app = express();

app.use(express.json());

routerLoader(app);

app.listen(8080, function () {
    console.log("Server on");
});
