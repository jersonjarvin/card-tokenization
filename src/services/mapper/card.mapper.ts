import { CardResDto } from "@/domain/dtos/card.dto";
import { CardEntity } from "@/domain/entities";

export class CardMapper {
    static map(data: CardEntity): CardResDto{
        return {
            card_number: data.card_number,
            email: data.email,
            expiration_month: data.expiration_month,
            expiration_year: data.expiration_year,
        } as CardResDto;
    }
}