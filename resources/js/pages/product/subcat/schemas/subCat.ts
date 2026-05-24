import { z } from 'zod';

export const subCatSchema = z.object({
    cat_id: z.number().min(1, 'Category is required'),
    name: z.string().min(1, 'Name is required').max(255),
});

export type SubCatFormValues = z.infer<typeof subCatSchema>;
