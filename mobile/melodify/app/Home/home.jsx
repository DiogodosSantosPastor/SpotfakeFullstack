import React, { useState, useEffect } from 'react';
import {
    StyleSheet, View, Text, Image, ActivityIndicator, TextInput, FlatList, Alert, TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Home() {
    const [searchText, setSearchText] = useState('');
    const [artistas, setArtistas] = useState([]);
    const [albuns, setAlbuns] = useState([]);
    const [musicas, setMusicas] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchArtistas = async () => {
        try {
            const response = await fetch("http://localhost:8000/art/artistas");
            const data = await response.json();
            setArtistas(data);
        } catch (error) {
            Alert.alert("Erro", "Erro ao listar os artistas");
            console.error(error);
        }
    };

    const fetchAlbuns = async () => {
        try {
            const response = await fetch("http://localhost:8000/art/albuns");
            const data = await response.json();
            setAlbuns(data);
        } catch (error) {
            Alert.alert("Erro", "Erro ao listar os álbuns");
            console.error(error);
        }
    };

    const fetchMusicas = async () => {
        try {
            const response = await fetch("http://localhost:8000/art/musicas");
            const data = await response.json();
            setMusicas(data);
        } catch (error) {
            Alert.alert("Erro", "Erro ao buscar músicas");
            console.error(error);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchArtistas(), fetchAlbuns(), fetchMusicas()]);
            setLoading(false);
        };
        loadData();
    }, []); 

    const renderArtista = ({ item }) => (
        <TouchableOpacity style={styles.artistaContainer}>
            <Image source={{ uri: item.fotoUrl || "https://placeholder.pics/svg/100" }} style={styles.artistaImage} />
            <Text style={styles.artistaNome}>{item.nome}</Text>
        </TouchableOpacity>
    );

    const renderAlbum = ({ item }) => (
        <TouchableOpacity
            style={styles.albumContainer}
        >
            <Image source={{ uri: item.capaUrl || "https://placeholder.pics/svg/200" }} style={styles.albumImage} />
            <View>
                <Text style={styles.albumTitulo}>{item.titulo}</Text>
                <Text style={styles.albumArtista}>{item.Artista?.nome}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderMusica = ({ item }) => (
        <TouchableOpacity style={styles.albumContainer}>
            <Text style={styles.albumTitulo}>{item.titulo}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Descubra Música</Text>
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Busque por músicas ou artistas"
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                    <Ionicons
                        name="person-circle-outline"
                        size={32}
                        color="white"
                        style={styles.iconQR}
                    />
                </View>
            </View>

            <Text style={styles.sectionTitle}>Álbuns</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#FF8746" />
            ) : (
                <FlatList
                    data={albuns}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderAlbum}
                />
            )}

            <Text style={styles.sectionTitle}>Artistas</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#FF8746" />
            ) : (
                <FlatList
                    data={artistas}
                    horizontal
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderArtista}
                />
            )}

            <Text style={styles.sectionTitle}>Músicas</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#FF8746" />
            ) : (
                <FlatList
                    data={musicas}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderMusica}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0E1236",
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        marginLeft: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        flex: 1,
    },
    iconQR: {
        marginLeft: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white",
        marginVertical: 10,
    },
    loadingText: {
        color: "white",
        textAlign: "center",
        marginTop: 20,
    },
    artistaContainer: {
        alignItems: "center",
        marginRight: 15,
    },
    artistaImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "gray",
    },
    artistaNome: {
        fontSize: 14,
        color: "white",
        marginTop: 5,
    },
    albumContainer: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderWidth: 1,
        borderColor: "#5D5FEF",
        borderRadius: 10,
        marginBottom: 10,
    },
    albumImage: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginRight: 15,
    },
    albumTitulo: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    },
    albumArtista: {
        fontSize: 14,
        color: "gray",
    },
});
