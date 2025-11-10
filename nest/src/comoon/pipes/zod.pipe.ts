import { ArgumentMetadata, PipeTransform } from "@nestjs/common";


export class zodValidationPipe implements PipeTransform {
    constructor(private schema: any) {}
    transform(value: any, metadata: ArgumentMetadata) {
        const result = this.schema.safeParse(value);
        if (!result.success) {
            throw new Error(`Validation failed: ${result.error.message}`);
        }
        return value;
}}