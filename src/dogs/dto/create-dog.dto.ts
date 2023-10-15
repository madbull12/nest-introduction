import { MinLength } from "class-validator";

export class CreateDogDto {
    @MinLength(3)
    name:string;
    type:string;
    
}
