import { Injectable, NestMiddleware } from "@nestjs/common";

@Injectable()
    export class loggerMiddleWare implements NestMiddleware {
    use(req: any, res: any, next: (error?:any)=> void) {
console.log(`${req.method }${req.url} ${new Date()}`);
next();

    }

    }
