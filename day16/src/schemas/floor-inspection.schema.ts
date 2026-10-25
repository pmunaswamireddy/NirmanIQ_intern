import {z} from 'zod';

export const MAX_FILE_SIZE=10*1024*1024; // 10MB
export const ACCEPTED_IMAGE_TYPES=['image/jpeg','image/png','image/webp','image/jpg'];

export const inspectionStatusEnum=z.enum(['PASS','FLAGGED','FAILED']);

export const photoEvidenceSchema=z.custom<File>((file)=>file instanceof File||(typeof file==='object'&&file!==null&&'size' in file&&'type' in file),{
  message:'Invalid file object',
})
.refine((file)=>file.size<=MAX_FILE_SIZE,'Photo size must be less than 10 MB')
.refine((file)=>ACCEPTED_IMAGE_TYPES.includes(file.type),'Only .jpg, .png, and .webp formats are accepted');

export const floorInspectionSchema=z.object({
  towerId:z.string().min(1,'Please select a tower'),
  floorId:z.string().min(1,'Please select a floor'),
  roomId:z.string().min(1,'Please select a room or area'),
  status:inspectionStatusEnum,
  notes:z.string().max(500,'Inspection remarks cannot exceed 500 characters').optional(),
  photo:photoEvidenceSchema.optional(),
});

export type InspectionStatus=z.infer<typeof inspectionStatusEnum>;
export type FloorInspectionForm=z.infer<typeof floorInspectionSchema>;
