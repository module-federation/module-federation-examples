export type ProfileData = {
  message: string;
};
const loader = async (): Promise<ProfileData> => {
  const msg = await new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('hello world333');
    }, 1000);
  });
  return {
    message: msg,
  };
};
export { loader };
