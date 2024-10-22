import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Link } from 'expo-router';

export default function registro(){
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  console.log(nome, sobrenome, email, senha, dataNascimento);

  const registrarUsuario = async function () {
    if (!nome || !sobrenome || !email || !senha || !dataNascimento) {
      console.log('Todos os campos devem ser preenchidos');
      return;
    }

    const resposta = await fetch('', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nome,
        sobrenome,
        email,
        senha,
        dataNascimento,
      }),
    });

    if (!resposta) {
      console.log('Erro na requisição');
    } else if (resposta.status === 200) {
      console.log('Usuário criado com sucesso');
    } else {
      console.log('Ocorreu um erro');
    }
  };

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
        <Pressable onPress={() => setModalVisible(true)}>
          <TextInput
            style={styles.input}
            value={dataNascimento}
            placeholder="Selecione a sua data de nascimento"
            placeholderTextColor="#ccc"
            editable={false} 
          />
        </Pressable>

        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <Calendar
              onDayPress={(day) => {
                setDataNascimento(day.dateString);
                setModalVisible(false);
              }}
              markedDates={{
                [dataNascimento]: { selected: true, marked: true, selectedColor: '#4b5ae1' },
              }}
            />
            <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </Modal>

        <View style={styles.pressableContainer}>
          <Pressable href="./inicio" style={styles.pressable} onPress={registrarUsuario}>
            <Text style={styles.pressableText}>Cadastrar</Text>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#4b5ae1',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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