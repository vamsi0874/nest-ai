import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";

import { Observable, map } from "rxjs";

@Injectable()
export class UsersInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        console.log('Intercepting...');

        return next.handle().pipe(
            map((data)=>data.map(({email,name})=>({email,name})))
        )
           
    }
}
