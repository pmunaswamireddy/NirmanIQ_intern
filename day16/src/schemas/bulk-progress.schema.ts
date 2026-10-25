import {z} from 'zod';

export const progressStatusEnum=z.enum(['NOT_STARTED','IN_PROGRESS','COMPLETED','ON_HOLD']);

export const bulkRowSchema=z.object({
  id:z.string().min(1),
  towerName:z.string().min(1),
  floorNumber:z.number().int().min(1),
  contractor:z.string().min(2,'Contractor name required'),
  progress:z.coerce.number().int('Progress must be integer').min(0,'Progress cannot be below 0%').max(100,'Progress cannot exceed 100%'),
  status:progressStatusEnum,
  remarks:z.string().max(120,'Remarks must be under 120 chars').optional(),
});

export const bulkTableSchema=z.array(bulkRowSchema);

export type ProgressStatus=z.infer<typeof progressStatusEnum>;
export type BulkRow=z.infer<typeof bulkRowSchema>;
export type BulkTable=z.infer<typeof bulkTableSchema>;
