import { Url2 } from "../models/Url.model";

// Create operation

export const createUrl = async (id: string, largeUrl:string) => {
    try {
        const newUrl =  Url2.build({
            id,
            largeUrl
        })

        const res = await newUrl.save();
        return res.id;
    
    
    } catch (error) {
        console.error(error);
    }
};

export const getUrl = async (id: string) => {
    try {
        const filterUrl = await Url2.findByPk(id);
        
        if (!filterUrl) {
            return 'The Url not found';
        }
        return filterUrl.largeUrl;


    } catch (error) {
        console.error(error);
    }
};

