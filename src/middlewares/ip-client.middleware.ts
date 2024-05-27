import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable() 
export class IpClientMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const ip = req.ip;          // Obtiene la dirección IP del cliente de la solicitud
        req['clientIp'] = ip;       // Adjunta la IP del cliente a la solicitud para su uso posterior
        next();
    }
}