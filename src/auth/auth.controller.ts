import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
         
    }

    @HttpCode(HttpStatus.OK)
    @Post("signup")
    public async signup(@Body() dto: AuthDto) {
        return await this.authService.signup(dto)

    }
    @HttpCode(HttpStatus.OK)
    @Post("signin")
    public async signin(@Body() dto: AuthDto) {
        return await this.authService.signin(dto)

    }
}
