import { z } from 'zod';

export const createEmployeeSchema = z
  .object({
    name: z.string().min(1),
    head_id: z.string().uuid().nullable(),
  })
  .required();
