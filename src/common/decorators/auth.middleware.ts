/*
 *Integração com autenticação externa
 *Integração com Keycloak
 *
*/
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private validTokens = {
    // Simulando um sistema de autenticação externo com tokens válidos(keycloak, redes sociais)
    'valid-token-123': { userId: 1, username: 'testuser', scope: ['read', 'write'] },
    'valid-token-456': { userId: 2, username: 'anotheruser', scope: ['read'] },
  };

  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Token de autenticação não fornecido.');
    }

    const token = authHeader.split(' ')[1];
    if (!token || !this.validTokens[token]) {
      throw new UnauthorizedException('Token inválido ou expirado.');
    }

    // Anexa as informações do usuário ao objeto de solicitação
    req['user'] = this.validTokens[token];
    next();
  }
}
