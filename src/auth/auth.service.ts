import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {
  constructor(private prisma: PrismaService,private jwtService:JwtService,private configService: ConfigService) {}
  public async signup(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      await this.prisma.user.create({
        data: {
          email: dto.email,
          hash,
        },
      });

      return {
        statusCode: '201',
        message: 'User created',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
      }
    }
  }
  public async signin(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const pwMatches = await argon.verify(user.hash,dto.password);

    if(!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');

    }



    return this.signToken(user.id,user.email)
  }
  public async signToken(userId:string,email:string):Promise<string> {
    const payload = {
      sub:userId,
      email
    }

    const secret = this.configService.get("JWT_SECRET")
    

    return this.jwtService.signAsync(payload,{
      expiresIn:"15m",
      secret
    })
  }
}
