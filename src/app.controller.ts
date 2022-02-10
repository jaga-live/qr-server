import { Controller, Get } from "@nestjs/common";


@Controller()
export class AppController{
    constructor(){}


    //////PING
    @Get()
    ping() {
        return {
            project: "QR Based Security Solution For Business Centers",
            team_members: 'Jagadheesh M; Logesh k; Yogeshwaran U G',
            guide: 'Ms. A.Suganya',
            server: "Nest JS / Express",
            database: 'MongoDB',
            batch: '♥♥♥ KCE - IT 2022 ♥♥♥'
        }
    }

}