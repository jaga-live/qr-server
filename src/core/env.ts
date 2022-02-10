import { config } from "dotenv"
config()

var env = process.env
export const ENV = {

    NODE_ENV: env.NODE_ENV,
    JWT_SECRET: env.JWT_SECRET

}