import { Router } from "express";
import { signinSchema, signupSchema } from "../zod";
import jwt from "jsonwebtoken"
import { config } from "dotenv"
import path  from "path";
import { pool } from "../db";

const userRouter = Router()
config({ path: path.resolve(__dirname, "../../.env") });

userRouter.post("/signin", async (req, res):Promise<any> => {
  const result = signinSchema.safeParse(req.body.inputs);
  if (!result.success) return res.status(400).send({
    msg: "Invalid Inputs",
    result
  })

  const query = {
    text: "SELECT * FROM users WHERE username = $1",
    values: [req.body.username]
  }

  const response = await pool.query(query)

  if(!response.rows[0]) return res.status(404).send({
    msg: "User does not exist",
  })

  if(req.body.password !== response.rows[0].password) return res.status(400).send({
    msg: "wrong password",
  })

  const token = jwt.sign(response.rows[0].id,process.env.JWT_SECRET || "")
  return res.send({
    msg: "signin",
    token
  })
})

userRouter.post("/signup", async (req, res):Promise<any> => {
  const result = signupSchema.safeParse(req.body.inputs);
  if (!result.success) return res.status(400).send({
    msg: "Invalid Inputs",
    result
  })
  const query = {
    text: "SELECT * FROM users WHERE username = $1",
    values: [req.body.username]
  }

  const response = await pool.query(query)
  if(response.rows[0]) return res.send({
    msg: "User already exist",
  })

  const userQuery = {
    text: "INSERT INTO users(username, email, password) VALUES ($1, $2, $3) RETURNING *",
    values: [req.body.username,req.body.email,req.body.password]
  }
  const newUser = await pool.query(userQuery)

  const token = jwt.sign(newUser.rows[0].id,process.env.JWT_SECRET || "")
  return res.send({
    msg: "login",
    token
  })
})

export default userRouter