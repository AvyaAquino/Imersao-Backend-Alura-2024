import express from "express";  
import { listarPosts, criarPost, uploadImagem } from "../controllers/postController.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage });

const routes = (app) => {

    app.use(express.json());

    app.get("/posts", listarPosts);
    app.post("/posts", criarPost)
    app.post("/upload", upload.single("imagem"), uploadImagem)
}   

export default routes;