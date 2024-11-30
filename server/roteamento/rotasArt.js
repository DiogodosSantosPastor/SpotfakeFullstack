import express from "express"
import { listarArtistas, listarAlbuns, exibirAlbum, exibirMusica, getMaisOuvidas } from '../controlador/ArtCont.js';

const rotasArt = express.Router()

rotasArt.get('/artistas', listarArtistas);

rotasArt.get('/albuns', listarAlbuns);

rotasArt.post('/onealbuns', exibirAlbum);

rotasArt.post('/musicas', exibirMusica);

rotasArt.post('/mais-ouvidas', getMaisOuvidas)

export { rotasArt }