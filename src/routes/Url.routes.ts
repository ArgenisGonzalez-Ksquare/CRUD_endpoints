import { Router, Request, Response } from 'express';
import { createUrl, getUrl } from '../repository/Url.repo';
import { v4 as uuidv4 } from 'uuid';
import { url } from 'inspector';


export const UrlRouter = Router();

//generamos los endpoints
UrlRouter.post('/new', async (req: Request, res: Response) => {
    
    const largeUrl = req.body.largeUrl as string;

    //primera validacion: ver que la url no este vacia
    if (!largeUrl) {
        res.status(400)
        return res.send({
            message: 'No Url'
        });
    };

    //validar que la url sea real o valida puede ser otra buena cosa a considerar

    const newId = uuidv4().split('-')[0];
    const newUrl = await createUrl(newId, largeUrl);

    return res.json({
        newUrl:  'http://localhost:5000/u/' + newUrl
    });

});

UrlRouter.get('/:uuid', async (req: Request, res: Response) => {

    const uuid = req.params['uuid'] as string;

    if (!uuid) {
        res.status(400)
        return res.send({
            message: 'No ID provided'
        })
    }

    const Url = await getUrl(uuid);
    
    if(!Url){
        res.status(404)
        return res.send({
            message: 'Not Found'
        })
    }

    //sire para redireccionar
    res.redirect(Url);

})