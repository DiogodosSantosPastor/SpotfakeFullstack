import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function Registro() {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const router = useRouter(); 

  const registrarUsuario = async () => {
    try {
      const resposta = await fetch('http://localhost:8000/autenticacao/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*',
        },
        body: JSON.stringify({
          "nome": nome,
          "sobrenome": sobrenome,
          "email": email,
          "senha": senha,
          "dataNascimento": dataNascimento,
        }),
      });

      if (resposta.ok) {
        router.push('/Inicio');
      } else {
        console.error('Erro ao registrar usuário:', await resposta.text());
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputcontainer}>
        <Text style={styles.title}>Cadastro</Text>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
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

        <Pressable style={styles.labelCadastro}>
          <Link href="./login" style={styles.pressableText}>
            Já tem Conta?
          </Link>
        </Pressable>
    
        <Pressable style={styles.pressable} onPress={registrarUsuario} >
          <Text style={styles.pressableText}>Cadastrar</Text>
        </Pressable>
        
        
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
  pressable: {
    backgroundColor: '#4b5ae1', 
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginTop: 20, 
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pressableText: {
    color: '#fff', 
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1, 
  },
  labelCadastro: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
});
