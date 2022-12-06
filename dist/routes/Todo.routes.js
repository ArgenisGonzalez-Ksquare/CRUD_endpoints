"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRouter = void 0;
const express_1 = require("express");
const Todo_repo_1 = require("../repository/Todo.repo");
const db = require('../models/Todo.model');
exports.TodoRouter = (0, express_1.Router)();
//generamos los endpoints
exports.TodoRouter.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /*     res.send('VIVEEEEEEEEEEE x2'); */
    const description = req.body.description;
    //primera validacion: ver que la url no este vacia
    if (!description) {
        res.status(400);
        return res.send({
            message: 'No Description provide'
        });
    }
    ;
    //validar que la url sea real o valida puede ser otra buena cosa a considerar
    const newTodoId = yield (0, Todo_repo_1.createTodo)(description);
    res.status(201);
    res.send({
        id: newTodoId,
        description: description,
        is_completed: req.body.is_completed,
    });
}));
exports.TodoRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    if (!id) {
        res.status(400);
        return res.send({
            message: 'No ID provided'
        });
    }
    const Todo = yield (0, Todo_repo_1.getTodo)(id);
    console.log(Todo);
    if (!Todo) {
        res.status(404);
        return res.send({
            message: 'Not Found'
        });
    }
    res.send({
        Todo
        /*         description: req.body.description as string,
                is_completed : req.body.is_completed as string, */
    });
}));
exports.TodoRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    const newDecription = req.body.desciption;
    const newIs_completed = req.body.is_completed;
    if (!id) {
        res.status(400);
        return res.send({
            message: 'No ID provided'
        });
    }
    const Todo = yield (0, Todo_repo_1.updateTodo)(id, newDecription, newIs_completed);
    if (!Todo) {
        res.status(404);
        return res.send({
            message: 'Not UPDATE done'
        });
    }
    res.send('UPDATE DONE');
}));
exports.TodoRouter.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params['id'];
    if (!id) {
        res.status(400);
        return res.send({
            message: 'No ID provided'
        });
    }
    const Todo = yield (0, Todo_repo_1.deleteTodo)(id);
    if (!Todo) {
        res.status(404);
        return res.send({
            message: 'Not DELETE done'
        });
    }
    res.send(Todo);
}));
