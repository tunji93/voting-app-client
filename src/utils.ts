type TokenPayload = {
  iat: number;
  exp: number;
  sub: string;
  name: string;
  pollId: string;
};

export const getTokenPayload = (accessToken: string): TokenPayload =>
  JSON.parse(window.atob(accessToken.split(".")[1]));
