import { ICardRepository } from '@/domain/interfaces/repository/card.contract';
import { TYPES } from '@common/constants';
import { RedisDB } from '@common/utils';
import { CardEntity } from '@/domain/entities';
import { injectable, inject } from 'inversify';
import { CardReqDto } from '@/domain/dtos/card.dto';
@injectable()
export class CardRepository implements ICardRepository {
  constructor(@inject(TYPES.RedisDB) private redis: RedisDB) {}
  async register(card: CardReqDto, token: string): Promise<void> {
    const client = await this.redis.getClient();
    await client.set(token, JSON.stringify(card));
  }
  async getByToken(token: string): Promise<CardEntity | null> {
    const client = await this.redis.getClient();
    const data = await client.get(token);
    if (data != null) return JSON.parse(data);
    return null;
  }
}
