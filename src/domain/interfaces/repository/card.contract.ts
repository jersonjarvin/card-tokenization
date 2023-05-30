import { CardReqDto } from '@/domain/dtos/card.dto';
import { CardEntity } from '@/domain/entities';

export interface ICardRepository {
  register(card: CardReqDto, token: string): Promise<void>;
  getByToken(token: string): Promise<CardEntity | null>;
}
