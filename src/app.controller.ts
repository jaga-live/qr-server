import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController{
    constructor(){}
    //////PING
    @Get()
    ping() {
        return {
            project: "QR Based Security Solution For Business Centers",
            server: "Nest JS / Express",
            author: 'Jaga'
        }
    }

}