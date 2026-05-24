import { z } from 'zod';

export const prodSchema = z.object({
    cat_id: z.number().min(1, 'Category is required'),
    subcat_id: z.number().min(1, 'Sub-category is required'),
    name: z.string().min(1, 'Name is required'),
    description: z.string().optional(),
    price: z.number().min(0),
    stock_quantity: z.number().int().min(0),
    sku: z.string().min(1, 'SKU is required'),
});

export type ProdFormValues = z.infer<typeof prodSchema>;
