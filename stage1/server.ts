import express, { Request, Response, NextFunction } from "express";
import requestIp from 'request-ip'
import cors from 'cors'

const app = express()

app.use(cors())


const getClientIp = (req: Request) => {
    console.log(requestIp.getClientIp(req))
    return requestIp.getClientIp(req)

}
app.use(
    (req: Request, res: Response, next: NextFunction) => {
        console.log(`Request  ${req.url} and request method ${req.method}`)
        next()
    }
)

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World!")
    next()
})


app.get('/api/hello', (req: Request, res: Response, next: NextFunction) => {
    try {

        console.log("hitting this endpoint from :", req.url)
        const visitorName = req.query.visitor_name || "Guest";
        const clientIp = getClientIp(req) || 'Unknown'
        const location = 'New York';
        const temperature = Math.round(Math.random() * 20);
        const response = {
            visitor_name: visitorName,
            client_ip: clientIp,
            location: location,
            temperature: temperature,
            greeting: `Hello  ${visitorName}!, the temperature is ${temperature} degrees Celsuis in ${location}`
        }
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }

})


app.listen(3000, () => {
    console.log('Server is running on port 3000')
})