export function getIsLoggedIn(): boolean {
  return Boolean(
    globalThis.document.cookie
      .split("; ")
      .find((row) => row.startsWith("access_token=")),
  );
}
