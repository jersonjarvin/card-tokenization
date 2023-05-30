import { CardReqDto, CardResDto } from "@/domain/dtos/card.dto";
import { ICardService } from "@/domain/interfaces/service/card.contract";
import { TYPES } from "@common/constants";
import { inject, injectable } from "inversify";
import { CardMapper } from "./mapper";
import { ICardRepository } from "@/domain/interfaces/repository";
import { TokenDto } from "@/domain/dtos";
import { NotFoundError } from "routing-controllers";
@injectable()
export class CardService implements ICardService {
    constructor(@inject(TYPES.CardRepository) private cardRepository:ICardRepository){
    }
    async register(card: CardReqDto, token:string): Promise<TokenDto> {
      await this.cardRepository.register(card, token);
      return {
        token: token
      };
    }
    async getByToken(token: string): Promise<CardResDto> {
        const data:any = await this.cardRepository.getByToken(token);
        if(data == null) throw new NotFoundError("data not exist.");
        return CardMapper.map(data);
    }
}