"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_ip_1 = __importDefault(require("request-ip"));
const app = (0, express_1.default)();
const getClientIp = (req) => {
    console.log(request_ip_1.default.getClientIp(req));
    return request_ip_1.default.getClientIp(req);
};
// app.use(
//     (req: Request, res: Response, next: NextFunction) => {
//         console.log(`Request  ${req.url} and request method ${req.method}`)
//         next()
//     }
// )
app.get('/api/hello', (req, res, next) => {
    try {
        console.log("hitting this endpoint from :", req.url);
        const visitorName = req.query.visitor_name || "Guest";
        const clientIp = getClientIp(req) || 'Unknown';
        const location = 'New York';
        const temperature = Math.round(Math.random() * 20);
        const response = {
            visitor_name: visitorName,
            client_ip: clientIp,
            location: location,
            temperature: temperature,
            greeting: `Hello  ${visitorName}!, the temperature is ${temperature} degrees Celsuis in ${location}`
        };
        res.status(200).json(response);
    }
    catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
//# sourceMappingURL=server.js.map