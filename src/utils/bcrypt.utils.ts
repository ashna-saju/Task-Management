import * as bcrypt from 'bcrypt';

/**
 * Encode a raw password securely using bcrypt.
 * @param rawPassword The raw password to be encoded.
 * @returns The hashed password string.
 */
export function encodePassword(rawPassword: string) {
  const SALT_ROUNDS = 10;
  const SALT = bcrypt.genSaltSync(SALT_ROUNDS);
  return bcrypt.hashSync(rawPassword, SALT);
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
    return false; 
  }
  return bcrypt.compareSync(rawPassword, hashedPassword);
}
