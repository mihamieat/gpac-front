const username = process.env.NEXT_PUBLIC_API_USERNAME!;
const password = process.env.NEXT_PUBLIC_API_PASSWORD!;
export const credentials = Buffer.from(`${username}:${password}`).toString(
  "base64",
);
