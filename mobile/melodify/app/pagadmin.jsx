import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';

export default function PagAdmin() {

  const usuariosExemplo = [
    { id: '1', nome: 'João Silva', email: 'joao@email.com', dataNascimento: '01/01/1990' },
    { id: '2', nome: 'Maria Oliveira', email: 'maria@email.com', dataNascimento: '15/03/1985' },
    { id: '3', nome: 'Carlos Souza', email: 'carlos@email.com', dataNascimento: '22/07/1978' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.userCard}>
      <Text style={styles.text}>Nome: {item.nome}</Text>
      <Text style={styles.text}>Email: {item.email}</Text>
      <Text style={styles.text}>Data de Nascimento: {item.dataNascimento}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Painel de Administração</Text>
      <FlatList
        data={usuariosExemplo}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12163a',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4b5ae1',
    marginBottom: 20,
  },
  userCard: {
    backgroundColor: '#292e5a',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
  },
});
