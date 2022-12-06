import { FILE } from "dns";
import { stat } from "fs";
import { Todo } from "../models/Todo.model";

// Create operation

export const createTodo =async (description:string) => {
    try {
        const newTodo = await Todo.create({
            description
        })

        return newTodo.id;
    } catch (error) {
        console.error(error);
    }
}


export const getTodo = async (id: number) => {
    try {
        const filterId = await Todo.findByPk(id);
        
        if (!filterId) {
            return 'The ID not found';
        }

        let status = 'Complete';
        
        if(filterId.is_completed === false){
            status = 'Imcomplete'
        }

        return ({
            "id": filterId.id,
            "desciption:" : filterId.description,
            "status": status
        })

    } catch (error) {
        console.error(error);
    }
};

export const updateTodo = async (id: number, newDecription:string, newIs_completed: boolean) => {
    try {
        const filterId = await Todo.findByPk(id);
        
        if (!filterId) {
            return 'The ID not found';
        }

        const updateTodo = await Todo.update({
            id: filterId.id,
            description: newDecription,
            is_completed: newIs_completed
        },
        {
            where:{id: filterId.id}
        })

        return 'DONE';
        
    } catch (error) {
        console.error(error);
    }
};


export const deleteTodo = async (newId: number) => {
    try {
        
        if (!newId) {
            return 'The ID not found';
        }

        const deleteTodo = await Todo.destroy(
            {
                where:{id:newId}
            }
        )

        return 'done';
        
        
    } catch (error) {
        console.error(error);
    }
};





