import 'dotenv/config';
import { ObjectId } from 'mongodb';
import conectarAoBanco from '../config/dbconfig.js';
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts() {
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

export async function criarNovoPost(novoPost) {
    const db = conexao.db("imersao-instabytes")
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");

    if (!ObjectId.isValid(id)) {
        throw new Error("ID inválido fornecido.");
    }
    return await colecao.updateOne(
        { _id: new ObjectId(id) },
        { $set: novoPost }
    );
}

