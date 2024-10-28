import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, Alert } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter(); // Instancia o router para navegação

  const realizarLogin = async function () {
    if (!email || !senha) {
      Alert.alert('Erro', 'Email e senha são obrigatórios');
      return;
    }

    try {
      const resposta = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      if (resposta.ok) {
        Alert.alert('Sucesso', 'Login realizado com sucesso');
        // Redireciona o usuário para a página de início após login bem-sucedido
        router.push('./inicio');
      } else if (resposta.status === 401) {
        Alert.alert('Erro', 'Credenciais incorretas');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro inesperado');
      }
    } catch (error) {
      Alert.alert('Erro', 'Erro na requisição');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputcontainer}>
        <Text style={styles.title}>Login</Text>
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

        <Pressable style={styles.labelCadastro}>
          <Link href="./registro" style={styles.pressableText}>
            Criar Conta?
          </Link>
        </Pressable>

        <View style={styles.pressableContainer}>
          <Pressable style={styles.pressable} onPress={realizarLogin}>
            <Text style={styles.pressableText}>Entrar</Text>
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
  labelCadastro: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  pressableText: {
    color: '#4b5ae1',
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
