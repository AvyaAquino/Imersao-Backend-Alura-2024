import { ObjectId } from 'mongodb';
import { getTodosPosts, criarNovoPost, atualizarPost } from '../models/postModel.js';
import fs from 'fs';
import gerarDescricaoComGemini from '../services/geminiService.js';

export async function listarPosts(req, res) {
    const posts = await getTodosPosts();
    res.status(200).json(posts);
}

export async function criarPost(req, res) {
    const novoPost = req.body;
    try {
        const postCriado = await criarNovoPost(novoPost);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.log(erro.message);
        res.status(500).send({"ERRO":"Falha ao criar novo post"});
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    }

    try {
        const postCriado = await criarNovoPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado);
    } catch (erro) {
        console.log(erro.message);
        res.status(500).send({"ERRO":"Falha ao criar novo post"});
    }
} 

export async function atualizaNovoPost(req, res) {
    const id = req.params.id;
    const urlImg = `http://localhost:3000/${id}.png`;
    try {
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer)
        const post = {
            imgUrl: urlImg,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post);
        res.status(200).json(postCriado);
    } catch (erro) {
        console.log(erro.message);
        res.status(500).send({"ERRO":"Falha ao criar novo post"});
    }
}