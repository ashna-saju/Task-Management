import * as bcrypt from 'bcrypt';

/**
 * Encode a raw password securely using bcrypt.
 * @param rawPassword The raw password to be encoded.
 * @returns The hashed password string.
 */
export function encodePassword(rawPassword: string) {
  const SALT_ROUNDS = 10; // Specify the number of salt rounds
  const salt = bcrypt.genSaltSync(SALT_ROUNDS);
  return bcrypt.hashSync(rawPassword, salt);
}


/**
 * Compare a raw password with a hashed password securely using bcrypt.
 * @param rawPassword The raw password to be compared.
 * @param hashedPassword The hashed password to be compared against.
 * @returns True if the raw password matches the hashed password, false otherwise.
 */
export function decodePassword(
  rawPassword: string,
  hashedPassword: string,
): boolean {
  if (!rawPassword || !hashedPassword) {
    return false; // Handle empty or null passwords
  }
  console.log(rawPassword)
  console.log(hashedPassword)
  console.log(bcrypt.compareSync(rawPassword, hashedPassword))
  return bcrypt.compareSync(rawPassword, hashedPassword);
}
