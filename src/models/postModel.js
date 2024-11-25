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
