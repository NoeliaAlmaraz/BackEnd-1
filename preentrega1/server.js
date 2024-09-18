import express from "express";

try {
  const server = express();
  const port = 8000;
  const ready = () => console.log("Server ready");
  server.listen(port, ready);

  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
} catch (error) {
    console.log(error);
}
