import { Request, Response } from "express";

export let analyzer = (request: Request, response: Response)=>{

    let r = [
    ]
    response.send(r);
}