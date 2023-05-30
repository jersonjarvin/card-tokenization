import {DatabaseConfig} from '@common/config/environment'
import { injectable } from 'inversify';
import { Client } from 'redis-om'
@injectable()
export class RedisDB {
    private client!:Client;
    constructor(){
    }
    async getClient(){
        if(this.client == null){
            this.client = await this.connect();
        }else {
            if(!this.client.isOpen()){
                this.client = await this.connect();
            }
        }
        return this.client;
    }
   
    private connect():Promise<Client>{
        return new Client().open(DatabaseConfig.redis_url);
    }
}

