export type ProfileData = {
  message: string;
  timestamp: string;
  status: 'success' | 'error';
};

const loader = async (): Promise<ProfileData> => {
  const msg = await new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve('Welcome to Route B');
    }, 500);
  });

  return {
    message: msg,
    timestamp: new Date().toLocaleString(),
    status: 'success',
  };
};

export { loader };
