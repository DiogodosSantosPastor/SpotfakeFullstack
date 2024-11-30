import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Pressable, TextInput, Alert, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function Perfil({ email }) {
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [emailUsuario, setEmailUsuario] = useState('');
  const [senhaAntiga, setSenhaAntiga] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const usuarioLogado = email;

  const fetchUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:8000/pesquisa/oneusuario", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json()
      setUserData(data)
      setFoto(data.foto)
      console.log(JSON.stringify(userData))
    } catch (error) {
      console.log(error)
    }
  };


  const trocarSenha = async () => {
    try {
      const response = await fetch("http://localhost:8000/autenticacao/trocasenha", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.text()
            if (response.ok) {
                if (data == "Senha atualizada com sucesso.") {
                    alert("Senha atualizada com sucesso.")
                }
            }

    } catch (error) {
      console.error('Erro ao trocar a senha:', error);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permissão necessária', 'Você precisa permitir o acesso à galeria para alterar a foto de perfil.');
      return;
    }


    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Pressable style={styles.backButton}>
        <Ionicons name="arrow-back" size={30} href="./config" color="#fff" />
      </Pressable>

      <View style={styles.profileContainer}>
        <Pressable onPress={pickImage}>
          {profileImage ? (
            <Image source={{ uri: profileImage }} style={styles.profileImage} />
          ) : (
            <Ionicons name="person-circle" size={80} color="#fff" style={styles.profileIcon} />
          )}
        </Pressable>

        <Text style={styles.changePhotoText}>Alterar foto</Text>

        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{nome}</Text>

        <Text style={styles.label}>Sobrenome:</Text>
        <Text style={styles.value}>{sobrenome}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{emailUsuario}</Text>

        <Text style={styles.label}>Trocar Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Senha antiga"
          secureTextEntry={true}
          onChangeText={setSenhaAntiga}
          value={senhaAntiga}
          placeholderTextColor="#ccc"
        />
        <TextInput
          style={styles.input}
          placeholder="Nova senha"
          secureTextEntry={true}
          onChangeText={setNovaSenha}
          value={novaSenha}
          placeholderTextColor="#ccc"
        />

        <Pressable style={styles.button} onPress={trocarSenha}>
          <Text style={styles.buttonText}>Confirmar troca de senha</Text>
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  profileContainer: {
    backgroundColor: '#292e5a',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
    marginTop: 80,
  },
  profileIcon: {
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  changePhotoText: {
    color: '#4b5ae1',
    fontSize: 16,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
  label: {
    width: '100%',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
  },
  value: {
    width: '100%',
    color: '#ccc',
    fontSize: 16,
    marginBottom: 10,
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
  button: {
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
