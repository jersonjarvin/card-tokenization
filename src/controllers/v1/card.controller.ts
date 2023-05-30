import { ICardService } from '@/domain/interfaces/service';
import { TYPES } from '@common/constants';
import { BaseController } from '@common/controllers';
import { inject } from 'inversify';
import { Body, Controller, Get, HeaderParam, Post, Res, UnauthorizedError } from 'routing-controllers';
import Koa from 'koa';
import { CardReqDto } from '@/domain/dtos';
import jwt from 'jsonwebtoken';
import { Token } from '@common/config';
@Controller('/v1/tokens')
export class CardController extends BaseController {
  constructor(@inject(TYPES.CardService) private cardService: ICardService) {
    super();
  }
  @Post()
  public async register(@Body() data: CardReqDto, @Res() res: Koa.Response) {
    const token = this.signIn(data);
    const result = await this.cardService.register(data, token);
    return this.ok(res, result);
  }
  @Get('/card-info')
  public async cardInfo(@HeaderParam('token') token: string, @Res() res: Koa.Response) {
    if (token) {
      const isValid = this.verify(token);
      if (isValid) {
        const result = await this.cardService.getByToken(token);
        return this.ok(res, result);
      } else {
        throw new UnauthorizedError('El token ha expirado.');
      }
    } else {
      throw new UnauthorizedError('token no ingresado.');
    }
  }

  signIn(card: CardReqDto): string {
    const token = jwt.sign({ email: card.email }, Token.jwt_secret_key, {
      expiresIn: '1m'
    });
    return token;
  }
  verify(token: string) {
    try {
      jwt.verify(token, Token.jwt_secret_key);
    } catch (err) {
      return false;
    }
    return true;
  }
}
