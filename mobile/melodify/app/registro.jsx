import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, Alert } from 'react-native';
import { Link } from 'expo-router';

const registrarUsuario = async (nome, sobrenome, email, senha, dataNascimento) => {
  if (!nome || !sobrenome || !email || !senha || !dataNascimento) {
    Alert.alert('Erro', 'Todos os campos devem ser preenchidos');
    return;
  }

  try {
    const resposta = await fetch('http://localhost:8000/registro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*',
      },
      body: JSON.stringify({
        nome,
        sobrenome,
        email,
        senha,
        dataNascimento,
      }),
    });

    if (resposta.status === 200) {
      Alert.alert('Sucesso', 'Usuário criado com sucesso');
    } else {
      Alert.alert('Erro', 'Ocorreu um erro ao criar o usuário');
    }
  } catch (error) {
    Alert.alert('Erro', 'Erro na requisição');
  }
};

export default function Registro() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');

  console.log(nome, sobrenome, email, senha, dataNascimento);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputcontainer}>
        <Text style={styles.title}>Cadastro</Text>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setNome}
          value={nome}
          placeholder="Insira o seu nome aqui"
          placeholderTextColor="#ccc"
        />
        <Text style={styles.label}>Sobrenome:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setSobrenome}
          value={sobrenome}
          placeholder="Insira o seu sobrenome aqui"
          placeholderTextColor="#ccc"
        />
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Insira o seu email aqui"
          keyboardType="email-address"
          placeholderTextColor="#ccc"
        />
        <Text style={styles.label}>Senha:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setSenha}
          value={senha}
          placeholder="Insira a sua senha aqui"
          secureTextEntry={true}
          placeholderTextColor="#ccc"
        />
        <Text style={styles.label}>Data de Nascimento:</Text>
        <TextInput
          style={styles.input}
          onChangeText={setDataNascimento}
          value={dataNascimento}
          placeholder="dd/mm/aaaa"
          placeholderTextColor="#ccc"
        />

        <View style={styles.pressableContainer}>
          <Pressable
            style={styles.pressable}
            onPress={() => registrarUsuario(nome, sobrenome, email, senha, dataNascimento)}
          >
            <Link href="/inicio" style={styles.pressableText}>
              Cadastrar
            </Link>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#12163a',
  },
  inputcontainer: {
    backgroundColor: '#292e5a',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  label: {
    width: '100%',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderColor: '#4b5ae1',
    backgroundColor: '#12163a',
    color: '#fff',
    width: '100%',
    marginVertical: 10,
    borderWidth: 3,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4b5ae1',
    marginBottom: 20,
  },
  pressableContainer: {
    width: '80%',
    marginTop: 20,
    borderColor: '#4b5ae1',
    borderWidth: 3,
  },
  pressable: {
    backgroundColor: '#12163a',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pressableText: {
    color: '#4b5ae1',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
