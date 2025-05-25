import { ErrorRequestHandler, Router } from "express";
import { signinSchema, signupSchema } from "../zod";
import jwt from "jsonwebtoken"
import { config } from "dotenv"
import path from "path";
import { pool } from "../db";

const userRouter = Router()
config({ path: path.resolve(__dirname, "../../.env") });

userRouter.post("/signin", async (req, res): Promise<any> => {
  const result = signinSchema.safeParse(req.body.inputs);
  if (!result.success) return res.send({
    msg: "Invalid Inputs",
    result
  })

  const { username, password } = req.body.inputs
  const query = {
    text: "SELECT * FROM users WHERE username = $1",
    values: [username]
  }

  const response = await pool.query(query)

  if (!response.rows[0]) return res.send({
    msg: "User does not exist",
  })

  if (password !== response.rows[0].password) return res.status(400).send({
    msg: "wrong password",
  })
  const token = jwt.sign(response.rows[0].id, process.env.JWT_SECRET || "")
  return res.send({
    msg: "signin",
    token,
    user: {
      id: response.rows[0].id,
      name: response.rows[0].username
    }
  })
})

userRouter.post("/signup", async (req, res): Promise<any> => {
  const result = signupSchema.safeParse(req.body.inputs);
  if (!result.success) return res.send({
    msg: "Invalid Inputs",
    result
  })
  const { username, password, email } = req.body.inputs
  const query = {
    text: "SELECT * FROM users WHERE username = $1",
    values: [username]
  }

  const response = await pool.query(query)
  if (response.rows[0]) return res.send({
    msg: "User already exist",
  })

  const userQuery = {
    text: "INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING *",
    values: [username, email, password]
  }
  const newUser = await pool.query(userQuery)

  const token = jwt.sign(newUser.rows[0].id, process.env.JWT_SECRET || "")
  return res.send({
    msg: "signup",
    token,
    user: {
      id: newUser.rows[0].id,
      name: newUser.rows[0].username
    }
  })
})

userRouter.use(((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({
    msg: 'Something broke!',
    err
  });
}) as ErrorRequestHandler)

export default userRouter