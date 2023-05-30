import { TokenDto } from '@/domain/dtos';
import { CardReqDto, CardResDto } from '@/domain/dtos/card.dto';

export interface ICardService {
  register(card: CardReqDto, token: string): Promise<TokenDto>;
  getByToken(token: string): Promise<CardResDto>;
}
