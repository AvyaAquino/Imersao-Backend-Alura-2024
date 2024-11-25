import express from "express";

const posts = [
    {
      descricao: "fototeste",
      imagem: "https://placecats.com/millie/300/150",
      id: 1
    },
    {
      descricao: "Gato brincando com bola",
      imagem: "https://placecats.com/millie/300/150",
      id: 2
    },
    {
      descricao: "Gatinho fazendo panqueca",
      imagem: "https://placecats.com/millie/300/150",
      id: 3
    }
  ];

const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log("Servidor Escutando");
});

app.get("/posts/", (req, res) => {
    res.status(200).json(posts);
});

function buscarPostPorId(id) {
    return posts.findIndex((post) => post.id === Number(id));
}

app.get("/posts/:id", (req, res) => {
    const index = buscarPostPorId(req.params.id);
    res.status(200).json(posts[index]);
});
