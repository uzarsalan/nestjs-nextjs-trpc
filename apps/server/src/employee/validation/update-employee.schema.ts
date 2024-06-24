import { z } from 'zod';

export const updateEmployeeSchema = z
  .object({
    id: z.string().uuid(),
    name: z.string().min(1),
    head_id: z.string().uuid().nullable(),
  })
  .required();
