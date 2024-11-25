import express from "express"
import { listarArtistas, listarAlbuns, exibirAlbum, exibirMusica } from '../controlador/ArtCont.js';

const rotasArt = express.Router()

rotasArt.get('/artistas', listarArtistas);

rotasArt.get('/albuns', listarAlbuns);

rotasArt.get('/albuns/:albumId', exibirAlbum);

rotasArt.get('/musicas/:musicaId', exibirMusica);

export { rotasArt }