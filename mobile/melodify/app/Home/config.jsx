import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

export default function Configuracao() {

  return (
    <View style={styles.container}>
      <Pressable style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} href="./home" color="#fff" />
      </Pressable>

      <Text style={styles.title}>Configurações</Text>

      <View style={styles.gridContainer}>
        <Pressable style={styles.gridItem}>
          <Link href="./perfil" style={styles.gridItemText}>
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    marginTop: 80, 
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
