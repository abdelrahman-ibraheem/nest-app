import { object, z } from 'zod';
import { Gender, Role } from '../user/user.model';

export const SignupSchema =z.strictObject( {
    email:z.email(),
    password:z.string().min(8).max(32),
    repeatPassword:z.string().min(8).max(32),
    useername:z.string().min(3).max(20),
    age:z.number().min(13),
phone:z.string().min(10).optional(),
role:z.enum(Role).optional(),
Gender:z.enum(Gender).optional


}).superRefine((args,ctx)=>{
    if(args.password!==args.repeatPassword){
        ctx.addIssue({
            code:"custom",
            message:"Passwords do not match",
        })
    }
})
export const loginSchema = z.object({
    email:z.email(),
    password:z.string().min(8).max(32),
})
