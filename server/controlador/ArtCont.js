import { Artista, Album, Musica } from "../db.js";

const listarArtistas = async (req, res) => {
    try {
        const artistas = await Artista.findAll();
        res.json(artistas);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar os artistas' });
    }
};

const listarAlbuns = async (req, res) => {
    try {
        const albuns = await Album.findAll({
            include: {
                model: Artista,
                as: 'Artista', // Inclui o artista relacionado
                attributes: ['nome'] // Apenas o nome do artista
            }
        });
        res.json(albuns);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar os álbuns' });
    }
};

const exibirAlbum = async (req, res) => {
    const { albumId } = req.params;
    try {
        const album = await Album.findByPk(albumId, {
            include: [
                {
                    model: Musica,
                    as: 'Musicas',
                    attributes: ['titulo', 'duracao', 'fileUrl'] // Campos da música
                },
                {
                    model: Artista,
                    as: 'Artista',
                    attributes: ['nome'] // Nome do artista
                }
            ]
        });

        if (!album) {
            return res.status(404).json({ error: 'Álbum não encontrado' });
        }

        res.json(album);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao exibir o álbum' });
    }
};


const exibirMusica = async (req, res) => {
    const { musicaId } = req.params;
    try {
        const musica = await Musica.findByPk(musicaId, {
            include: [
                {
                    model: Album,
                    attributes: ['title', 'releaseYear'], // Informações do álbum
                    as: 'Album'
                },
                {
                    model: Artista,
                    attributes: ['nome'], // Nome do artista
                    as: 'Artista'
                }
            ]
        });

        if (!musica) {
            return res.status(404).json({ error: 'Música não encontrada' });
        }

        res.json(musica);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao exibir a música' });
    }
};

export { listarArtistas, listarAlbuns, exibirAlbum, exibirMusica }