import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";
 

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
console.log('before')
return next
.handle()
.pipe(
    map((resData)=>{
        const {message='success',data={},status=200} =resData
        return {message,data:data,status}
        
    })
)
}
}