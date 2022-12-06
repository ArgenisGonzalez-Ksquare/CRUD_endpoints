import { Router, Request, Response } from 'express';
import { createTodo, getTodo, updateTodo,deleteTodo } from '../repository/Todo.repo';


const db = require('../models/Todo.model')

export const TodoRouter = Router();

//generamos los endpoints
TodoRouter.post('/new', async (req: Request, res: Response) => {
/*     res.send('VIVEEEEEEEEEEE x2'); */
    
    const description = req.body.description as string;

    //primera validacion: ver que la url no este vacia
    if (!description) {
        res.status(400)
        return res.send({
            message: 'No Description provide'
        });
    };

    //validar que la url sea real o valida puede ser otra buena cosa a considerar
    const newTodoId = await createTodo(description);

    res.status(201);
    res.send({
        id: newTodoId,
        description: description,
        is_completed : req.body.is_completed as string,
    })

});

TodoRouter.get('/:id', async (req: Request, res: Response) => {

    const id = req.params['id'] as unknown as number;

    if (!id) {
        res.status(400)
        return res.send({
            message: 'No ID provided'
        })
    }

    const Todo = await getTodo(id);
    console.log(Todo)
    
    if(!Todo){
        res.status(404)
        return res.send({
            message: 'Not Found'
        })
    }

    res.send({
        Todo
/*         description: req.body.description as string,
        is_completed : req.body.is_completed as string, */
    })

})


TodoRouter.put('/:id',async (req:Request, res: Response) => {
    const id = req.params['id'] as unknown as number;
    const newDecription = req.body.desciption as string;
    const newIs_completed = req.body.is_completed as boolean;

    if (!id) {
        res.status(400)
        return res.send({
            message: 'No ID provided'
        })
    }

    const Todo = await updateTodo(id, newDecription, newIs_completed);
    
    if(!Todo){
        res.status(404)
        return res.send({
            message: 'Not UPDATE done'
        })
    }

    res.send('UPDATE DONE')
    
})


TodoRouter.delete('/delete/:id',async (req:Request, res: Response) => {
    const id = req.params['id'] as unknown as number;

    if (!id) {
        res.status(400)
        return res.send({
            message: 'No ID provided'
        })
    }

    const Todo = await deleteTodo(id);
    
    if(!Todo){
        res.status(404)
        return res.send({
            message: 'Not DELETE done'
        })
    }

    res.send(Todo)
    
})