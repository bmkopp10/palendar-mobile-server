import { Request } from 'express';

export const validateEventRequest = (req: Request) => {
  if (!req.query.id) {
    throw new Error('ID parameter is required');
  }
};
