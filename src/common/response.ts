import { Injectable, NestInterceptor, CallHandler, ExecutionContext} from "@nestjs/common";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";

interface Data<T>{
    data:T;
}
@Injectable()
export class Response<T> implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<Data<T>> | Promise<Observable<any>> {
        return next.handle().pipe(map(data=>{
            return {
                data,
                status: 0,
                timeStamp: new Date().getTime(),
                success: true
            }
        }))
    }
}
