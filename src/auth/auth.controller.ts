import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
         
    }

    @Post("signup")
    public async signup(@Body() dto: AuthDto) {
        return await this.authService.signup(dto)

    }

    @Post("signin")
    public async signin(@Body() dto: AuthDto) {
        return await this.authService.signin(dto)

    }
}
