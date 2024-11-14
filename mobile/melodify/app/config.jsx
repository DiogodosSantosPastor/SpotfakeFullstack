import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function Configuracao() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>

      <View style={styles.gridContainer}>
        <Pressable style={styles.gridItem}>
          <Link href="/perfil" style={styles.gridItemText}>
            Perfil
          </Link>
        </Pressable>

        <View style={styles.gridItem}></View>
        <View style={styles.gridItem}></View>
        <View style={styles.gridItem}></View>
      </View>

      <View style={styles.options}>
        <Text style={styles.optionItem}>Feedback</Text>
        <Text style={styles.optionItem}>Avalie</Text>
        <Text style={styles.optionItem}>Compartilhar Melodify</Text>
        <Text style={styles.optionItem}>Política de Privacidade</Text>
        <Text style={styles.optionItem}>Termos de Serviço</Text>
        <Text style={styles.optionItem}>Sobre</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12163a',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  gridItem: {
    backgroundColor: '#292e5a',
    width: '45%',
    height: 100,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#4b5ae1',
  },
  gridItemText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  options: {
    borderTopWidth: 1,
    borderTopColor: '#4b5ae1',
    paddingTop: 15,
  },
  optionItem: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
  },
});
