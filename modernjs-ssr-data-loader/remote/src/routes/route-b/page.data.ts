export type ProfileData = {
  message: string;
};
const loader = async (): Promise<ProfileData> => {
  const msg = await new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('route-b');
    }, 0);
  });
  console.log('msg', msg);
  return {
    message: msg,
  };
};
export { loader };
