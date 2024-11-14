import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, ActivityIndicator } from 'react-native';

export default function Perfil() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    // Função para buscar os dados do usuário ao carregar a página
    const carregarPerfil = async () => {
      try {
        const resposta = await fetch('http://localhost:8000/pesquisa/oneuser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Token de autenticação, se necessário
          },
        });

        const dados = await resposta.json();
        setNome(dados.nome);
        setSobrenome(dados.sobrenome);
        setEmail(dados.email);
        setCarregando(false);
      } catch (erro) {
        console.error('Erro ao carregar perfil:', erro);
        setCarregando(false);
      }
    };

    carregarPerfil();
  }, []);

  const atualizarPerfil = async () => {
    try {
      const resposta = await fetch('http://localhost:8000/usuario/atualizar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Token de autenticação, se necessário
        },
        body: JSON.stringify({
          nome,
          sobrenome,
          email,
          senha,
        }),
      });

      const mensagem = await resposta.text();
      if (mensagem === 'Perfil atualizado com sucesso!') {
        alert('Perfil atualizado!');
      } else {
        console.error('Erro ao atualizar perfil:', mensagem);
      }
    } catch (erro) {
      console.error('Erro ao atualizar perfil:', erro);
    }
  };

  if (carregando) {
    return <ActivityIndicator size="large" color="#4b5ae1" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
          placeholder="Insira o seu nome"
          placeholderTextColor="#ccc"
        />

        <Text style={styles.label}>Sobrenome:</Text>
        <TextInput
          style={styles.input}
          value={sobrenome}
          onChangeText={setSobrenome}
          placeholder="Insira o seu sobrenome"
          placeholderTextColor="#ccc"
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Insira o seu email"
          placeholderTextColor="#ccc"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholder="Insira a sua senha"
          placeholderTextColor="#ccc"
          secureTextEntry
        />
      </View>

      <Button title="Atualizar Perfil" onPress={atualizarPerfil} color="#4b5ae1" />
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
  inputContainer: {
    backgroundColor: '#292e5a',
    padding: 20,
    borderRadius: 10,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderColor: '#4b5ae1',
    backgroundColor: '#12163a',
    color: '#fff',
    marginBottom: 15,
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
});
