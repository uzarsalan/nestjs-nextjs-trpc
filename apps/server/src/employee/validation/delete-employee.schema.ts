import { z } from 'zod';

export const deleteEmployeeSchema = z
  .object({
    id: z.string().uuid(),
  })
  .required();
