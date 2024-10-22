import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Melodify() {
  const artistasPopulares = [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' }];
  const musicas = [
    { id: '1', nome: 'Música 1', artista: 'Artista 1' },
    { id: '2', nome: 'Música 2', artista: 'Artista 2' },
    { id: '3', nome: 'Música 3', artista: 'Artista 3' },
  ];

  const renderArtista = ({ item }) => (
    <View style={styles.artistaContainer}>
      <View style={styles.artistaCircle} />
    </View>
  );

  const renderMusica = ({ item }) => (
    <TouchableOpacity style={styles.musicaContainer}>
      <View style={styles.musicaImage} />
      <View>
        <Text style={styles.musicaNome}>{item.nome}</Text>
        <Text style={styles.musicaArtista}>{item.artista}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Melodify</Text>
        <Ionicons name="search-outline" size={24} color="white" />
        <Ionicons name="settings-outline" size={24} color="white" />
      </View>
    
      <Text style={styles.sectionTitle}>Artistas Populares</Text>
      <FlatList
        data={artistasPopulares}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={renderArtista}
        showsHorizontalScrollIndicator={false}
        style={styles.artistasList}
      />
      
      <FlatList
        data={musicas}
        keyExtractor={(item) => item.id}
        renderItem={renderMusica}
        style={styles.musicasList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0E1236',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginVertical: 10,
  },
  artistasList: {
    marginBottom: 20,
  },
  artistaContainer: {
    marginRight: 10,
  },
  artistaCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'gray',
  },
  musicasList: {
    flex: 1,
  },
  musicaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#5D5FEF',
    borderRadius: 10,
    marginBottom: 10,
  },
  musicaImage: {
    width: 50,
    height: 50,
    backgroundColor: 'gray',
    marginRight: 15,
  },
  musicaNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  musicaArtista: {
    fontSize: 14,
    color: 'gray',
  },
});
