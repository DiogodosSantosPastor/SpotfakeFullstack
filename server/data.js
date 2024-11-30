import { sequelize, Artista, Album, Musica } from './db.js'; // Assumindo que os modelos já estão configurados


const adicionarDados = async () => {
    const transaction = await sequelize.transaction(); // Inicia uma transação

    try {
        // Adicionando artistas
        const artistas = await Artista.bulkCreate([
            {
                nome: 'Anitta',
                bio: 'Cantora, compositora e empresária brasileira, conhecida por sua música pop e sucesso internacional.',
                imageUrl: 'https://example.com/anitta.jpg'
            },
            {
                nome: 'Luan Santana',
                bio: 'Cantor e compositor de música sertaneja, famoso por suas baladas românticas e grande popularidade no Brasil.',
                imageUrl: 'https://example.com/luan_santana.jpg'
            },
            {
                nome: 'Ivete Sangalo',
                bio: 'Cantora baiana de música pop, axé e samba, reconhecida por sua energia no palco e seu carisma.',
                imageUrl: 'https://example.com/ivete_sangalo.jpg'
            }
        ], { transaction });

        // Adicionando álbuns
        const albuns = await Album.bulkCreate([
            {
                title: 'Vai Malandra',
                releaseYear: 2018,
                coverImageUrl: 'https://example.com/vaimalandra.jpg',
                artista_id: artistas[0].id
            },
            {
                title: 'Versions of Me',
                releaseYear: 2022,
                coverImageUrl: 'https://example.com/versionsofme.jpg',
                artista_id: artistas[0].id
            },
            {
                title: 'Viva',
                releaseYear: 2013,
                coverImageUrl: 'https://example.com/viva.jpg',
                artista_id: artistas[1].id
            },
            {
                title: 'Ao Vivo no Maracanã',
                releaseYear: 2017,
                coverImageUrl: 'https://example.com/aovivonomaracana.jpg',
                artista_id: artistas[1].id
            },
            {
                title: 'Festa no Mar',
                releaseYear: 2015,
                coverImageUrl: 'https://example.com/festanomart.jpg',
                artista_id: artistas[2].id
            },
            {
                title: 'Ivete Sangalo Ao Vivo',
                releaseYear: 2007,
                coverImageUrl: 'https://example.com/ivetesangalovivo.jpg',
                artista_id: artistas[2].id
            }
        ], { transaction });

        // Adicionando músicas
        await Musica.bulkCreate([
            {
                titulo: 'Vai Malandra',
                duracao: 123,
                fileUrl: 'https://example.com/vaimalandra.mp3',
                artista_id: artistas[0].id,
                album_id: albuns[0].id
            },
            {
                titulo: 'Machika',
                duracao: 123,
                fileUrl: 'https://example.com/machika.mp3',
                artista_id: artistas[0].id,
                album_id: albuns[0].id
            },
            {
                titulo: 'Indecente',
                duracao: 312,
                fileUrl: 'https://example.com/indecente.mp3',
                artista_id: artistas[0].id,
                album_id: albuns[0].id
            },
            {
                titulo: 'Sim ou Não',
                duracao: 321,
                fileUrl: 'https://example.com/simounao.mp3',
                artista_id: artistas[0].id,
                album_id: albuns[0].id
            },
            {
                titulo: 'Na Sua Cara',
                duracao: 123,
                fileUrl: 'https://example.com/nasuacara.mp3',
                artista_id: artistas[0].id,
                album_id: albuns[0].id
            },
            {
                titulo: 'Te Esperando',
                duracao: 123,
                fileUrl: 'https://example.com/teesperando.mp3',
                artista_id: artistas[1].id,
                album_id: albuns[2].id
            },
            {
                titulo: 'Quando a Bad Bater',
                duracao: 321,
                fileUrl: 'https://example.com/quandobad.mp3',
                artista_id: artistas[1].id,
                album_id: albuns[2].id
            }
        ], { transaction });

        await transaction.commit(); // Confirma a transação
        console.log('Dados adicionados com sucesso!');
    } catch (error) {
        await transaction.rollback(); // Reverte as alterações em caso de erro
        console.error('Erro ao adicionar os dados:', error);
    }
};
export{adicionarDados}