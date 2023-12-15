import { ok } from "assert";
import express, { NextFunction, Request, Response } from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//dynamic path with route parameters

const handleGetBookOne = (req: Request, res: Response, next: NextFunction) => {
  console.log("handleGetBookOne");
  next();
  console.log("don't use return statement after Next()");
};

const handleGetBookTwo = (
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  console.log(req.params, "from handleGetBookTwo");
  return res.send(req.params);
};

app.get("/api/books/:bookId/:authorId", [handleGetBookOne, handleGetBookTwo]);

app.get("/api/health", (req: Request, res: Response) => {
  return res.send("health");
});

app.get("/api/abc*d", (req: Request, res: Response) => {
  return res.send("abc*d");
});

app.get("/api/abc", (req: Request, res: Response) => {
  return res.send("abc");
});

// Regular Expression  / symbol stands for start and end also \/ here \ is escape character for
app.get(/\/api\/abce/, (req: Request, res: Response) => {
  return res.send("abce");
});

//This pattern looks for the exact string "prod" followed by any single character and then the string "ct". Example: product
app.get(/\/api\/prod.ct\//, (req: Request, res: Response) => {
  return res.send("prod");
});

//.*: This part matches zero or more of any character (except for a newline). /api/products/  , /api/products/ABC, /api/products/123/456
app.get(/\/api\/products\/.*/, (req: Request, res: Response) => {
  return res.send("products");
});

app.get(/\/api\/users\/\d+\w+/, (req: Request, res: Response) => {
  return res.send("users/01");
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
