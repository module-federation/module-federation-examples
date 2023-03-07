import { Request, Response } from 'express';

export interface UserDTO {
  id: number;
  name: string;
  company: string;
}

export async function userRoute(req: Request, res: Response) {
  const response: UserDTO = {
    id: 1337,
    name: 'John Doe',
    company: 'Acme Inc.',
  };

  res.json(response);
}

export default userRoute;
