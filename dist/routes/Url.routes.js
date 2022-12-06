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
exports.UrlRouter = void 0;
const express_1 = require("express");
const Url_repo_1 = require("../repository/Url.repo");
const uuid_1 = require("uuid");
exports.UrlRouter = (0, express_1.Router)();
//generamos los endpoints
exports.UrlRouter.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const largeUrl = req.body.largeUrl;
    //primera validacion: ver que la url no este vacia
    if (!largeUrl) {
        res.status(400);
        return res.send({
            message: 'No Url'
        });
    }
    ;
    //validar que la url sea real o valida puede ser otra buena cosa a considerar
    const newId = (0, uuid_1.v4)().split('-')[0];
    const newUrl = yield (0, Url_repo_1.createUrl)(newId, largeUrl);
    return res.json({
        newUrl: 'http://localhost:5000/u/' + newUrl
    });
}));
exports.UrlRouter.get('/:uuid', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uuid = req.params['uuid'];
    if (!uuid) {
        res.status(400);
        return res.send({
            message: 'No ID provided'
        });
    }
    const Url = yield (0, Url_repo_1.getUrl)(uuid);
    if (!Url) {
        res.status(404);
        return res.send({
            message: 'Not Found'
        });
    }
    //sire para redireccionar
    res.redirect(Url);
}));
