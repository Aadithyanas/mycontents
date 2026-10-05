import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'Name must be at least 2 characters').max(60, 'Name is too long'),
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string().min(6, 'Please confirm your password'),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: 'You must agree to the Terms of Service & Privacy Policy',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const accessRequestSchema = z.object({
  reason: z
    .string()
    .min(15, 'Please provide at least 15 characters explaining your use case')
    .max(800, 'Reason must be under 800 characters'),
  intendedUsage: z.enum(['academic', 'commercial', 'evaluation', 'other']),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type AccessRequestInput = z.infer<typeof accessRequestSchema>;
