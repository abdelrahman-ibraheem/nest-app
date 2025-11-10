import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class checkPasswordPipe implements PipeTransform {
transform(value: any, metadata: ArgumentMetadata) {
    console.log(value,metadata);
    
}
}