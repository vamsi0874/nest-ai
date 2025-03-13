import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy } from "passport-local";
import { AuthService } from "../auth/auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    
    constructor(private authService: AuthService) {
        super({ usernameField: 'email' })
     
    }
    async validate(email: string, password: string) {
       console.log('email',email)
        const user = await this.authService.validateUser(email, password);
        if (!user) {
            console.log('kk')
            throw new UnauthorizedException();
        }
        return user;
    }
}