import {z} from 'zod';

export const step1BasicSchema=z.object({
  name:z.string().trim().min(3,'Project name must be at least 3 characters').max(100,'Name exceeds 100 characters'),
  code:z.string().trim().regex(/^PRJ-[A-Z0-9]{3,6}$/i,'Code must match format PRJ-XXX (e.g. PRJ-HYD01)'),
  location:z.string().trim().min(2,'Site location is required'),
  targetDate:z.string().min(1,'Target completion date is required').refine((val)=>{
    const d=new Date(val);
    return !isNaN(d.getTime())&&d>new Date();
  },'Target date must be set to a future date'),
  clientName:z.string().trim().min(2,'Client or developer name is required'),
});

export const towerConfigSchema=z.object({
  name:z.string().trim().min(2,'Tower name is required (e.g. Tower A)'),
  floorCount:z.coerce.number().int('Floors must be an integer').min(1,'Must have at least 1 floor').max(120,'Cannot exceed 120 floors'),
  estimatedBudget:z.coerce.number().positive('Budget must be greater than zero'),
});

export const step2TowersSchema=z.object({
  towers:z.array(towerConfigSchema).min(1,'At least one tower must be configured').max(10,'Cannot exceed 10 towers per project'),
});

export const fullProjectSchema=step1BasicSchema.extend({
  towers:z.array(towerConfigSchema).min(1,'At least one tower must be configured').max(10,'Cannot exceed 10 towers per project'),
  projectNotes:z.string().max(500,'Notes cannot exceed 500 characters').optional(),
});

export type Step1BasicForm=z.infer<typeof step1BasicSchema>;
export type TowerConfig=z.infer<typeof towerConfigSchema>;
export type Step2TowersForm=z.infer<typeof step2TowersSchema>;
export type FullProjectForm=z.infer<typeof fullProjectSchema>;
