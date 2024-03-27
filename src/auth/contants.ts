import * as dotenv from 'dotenv'
dotenv.config()
export const jwtConstants = {
  // Secret key used for JWT token generation and validation.
  secret: process.env.JWT_SECRET
}

