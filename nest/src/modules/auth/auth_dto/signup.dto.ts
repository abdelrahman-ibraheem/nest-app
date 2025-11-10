import z from 'zod';
import{loginSchema, SignupSchema}from '../signup.zod';
export type SignupDto = z.infer<typeof SignupSchema>&{firstName:string,lastName:string};
export type LoginDto = z.infer<typeof loginSchema>;