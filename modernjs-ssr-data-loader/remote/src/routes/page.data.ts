import type { ActionFunction } from '@modern-js/runtime/router';

const storage = new Map();
const key = 'modernTestActionName'

export type ProfileData = {
  message: string;
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const user = await request.json();
    const { name } = user;
    storage.set(key, name);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const loader = async (): Promise<ProfileData> => {
  const msg = await new Promise<string>((resolve) => {
    setTimeout(() => {
      const value = storage.get(key);
      resolve(value || 'hello world');
    }, 0);
  });
  return {
    message: msg,
  };
};
