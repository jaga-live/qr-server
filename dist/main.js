"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const exception_1 = require("./core/exception");
async function server() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.setGlobalPrefix('v1', {
        exclude: ['/']
    });
    app.useGlobalFilters(new exception_1.AllExceptionsFilter());
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true }));
    await app.listen(5000);
}
server();
//# sourceMappingURL=main.js.map