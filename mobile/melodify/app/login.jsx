import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable } from 'react-native';

export default login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  console.log(email, senha);

  const realizarLogin = async function () {
    if (!email || !senha) {
      console.log('Email e senha são obrigatórios');
      return;
    }

    const resposta = await fetch('', {
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

    if (!resposta) {
      console.log('Erro na requisição');
    } else if (resposta.status === 200) {
      console.log('Login realizado com sucesso');
    } else {
      console.log('Credenciais incorretas');
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

        <View style={styles.pressableContainer}>
          <Pressable style={styles.pressable} onPress={realizarLogin}>
            <Text style={styles.pressableText}>Entrar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
