
import {Router, Request, Response} from "express";
import { Shop } from "./shop";

const shops:Shop[] = [
    {id: 111, name: "Pepper's Pizza", rating: 4.5},
    {id: 222, name: "Clive's Chives", rating: 3.4},
    {id: 333, name: "Betty's Brews", rating: 4.3},
    {id: 444, name: "Sylvester's Shoes", rating: 3.8},
    {id: 555, name: "Teddy's Tunes", rating: 4.7}
];

export const shopRouter = Router();

shopRouter.get("/", async (req:Request, res:Response) : Promise<Response> => {
    if(req.query.minRating !== undefined){
        let minRating = shops.filter((x) => x.rating > Number(req.query.minRating));
        
        return res.status(200).json(minRating);
    }
    else {
        return res.status(200).json(shops.filter((x) => x.rating));
    }
});


shopRouter.get("/:id", async (req:Request, res:Response) : Promise<Response> => {
    let getId = shops.find((x) => x.id === Number(req.params.id));
    if (getId === undefined) {
        return res.status(404).json(`error: Shop not found: ${req.params.id}`);
    } 
    else {
        return res.status(200).json(getId);
    }
});

shopRouter.post("/", async (req:Request, res:Response) : Promise<Response> => {
    let newShop:Shop = {
        id: (),
        name: req.body.name,
        rating: Number(req.body.rating),
    }
    shops.push(newShop);
    return res.status(200).send("new shop added");
});

shopRouter.put("/:id", async (req:Request, res:Response) : Promise<Response> => {
    let itemUpdate = shops.find((x) => x.id === Number(req.params.id));
    if (itemUpdate !== undefined) {
        return res.status(200).send("updated");
    }
    else {
        return res.status(400).send("could not update");
    }
});

shopRouter.delete("/:id", async (req:Request, res:Response) : Promise<Response> => {
    let findItem = shops.find((x) => x.id === Number(req.params.id));
    if (findItem === undefined) {
        return res.status(400);
    }
    else {
        return res.status(204).send('deleted');
    }
});