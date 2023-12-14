import { ok } from "assert";
import express, { Request, Response } from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (req: Request, res: Response) => {
  return res.send("health");
});

app.get("/api/abc*d", (req: Request, res: Response) => {
  return res.send("abc*d");
});

app.get("/api/abc", (req: Request, res: Response) => {
  return res.send("abc");
});

app
  .route("/api/books")
  .get((req: Request, res: Response) => {
    return res.send("You made a get request");
  })
  .post((req: Request, res: Response) => {
    return res.send("You made a POST request");
  })
  .put((req: Request, res: Response) => {
    return res.send("You made a PUT request");
  })
  .all((req: Request, res: Response) => {
    return res.send("You made an X request");
  });

app.get("/", (req: Request, res: Response) => {
  return res.json({ test1: "test2" });
});

app.post("/api/data", (req: Request, res: Response) => {
  console.log(req.body);
  return res.sendStatus(200);
});

app.listen(3000, () => {
  console.log("Application listening at http://localhost:3000");
});
