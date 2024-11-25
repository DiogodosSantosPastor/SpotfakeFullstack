import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView, Modal, TextInput, FlatList, SafeAreaView, StyleSheet } from "react-native";

export default function PagAdmin() {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [usuarios, setUsuarios] = useState([]);
    const [email, setEmail] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://localhost:8000/pesquisa/user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "*/*",
                    }
                });
                const data = await response.json();
                setUsuarios(data);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
                alert("Erro ao buscar usuários");
            }
        };

        fetchUsers();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.userCard}>
            <Text style={styles.text}>Nome: {item.nome}</Text>
            <Text style={styles.text}>Email: {item.email}</Text>
            <Text style={styles.text}>Data de Nascimento: {item.dataNascimento}</Text>
        </View>
    );

    const handleDeleteUser = async () => {
        try {
            const response = await fetch(`http://localhost:8000/pesquisa/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }) 
            });
            if (response.ok) {
                alert("Usuário deletado com sucesso!");
                setEmail(""); 
                setModalVisible(false); 
            } else {
                alert("Erro ao deletar usuário");
            }
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            alert("Erro ao deletar usuário");
        }
    };

    const dadosModal = (botao) => {
        switch (botao) {
            case "Todos":
                setModalContent(
                    <SafeAreaView style={styles.modalContent}>
                        <Text style={styles.title}>Todos os Usuários</Text>
                        <FlatList
                            data={usuarios}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                        />
                    </SafeAreaView>
                );
                break;

            case "Deletar":
                setModalContent(
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Deletar Usuário</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite o email do usuário"
                            placeholderTextColor="#ccc"
                            value={email}
                            onChangeText={setEmail}
                            />
                        <Pressable style={styles.pressable} onPress={handleDeleteUser}>
                            <Text style={styles.pressable_text}>Deletar</Text>
                        </Pressable>
                    </View>
                );
                break;

            default:
                setModalContent(null);
                break;
        }
        setModalVisible(true);
    };

    return (
        <ScrollView style={styles.scrollview}>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <ScrollView style={styles.modal_scrollview}>
                    <View style={styles.modal_container}>
                        {modalContent}
                        <Pressable style={styles.pressable} onPress={() => setModalVisible(false)}>
                            <Text style={styles.pressable_text}>Fechar</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </Modal>

            <View style={styles.outer_container}>
                <View style={styles.main_container}>
                    <Text style={styles.title}>Painel de Controle</Text>

                    <Pressable style={styles.pressable} onPress={() => dadosModal("Todos")}>
                        <Text style={styles.pressable_text}>Todos os Usuários</Text>
                    </Pressable>

                    <Pressable style={styles.pressable} onPress={() => dadosModal("Deletar")}>
                        <Text style={styles.pressable_text}>Deletar um Usuário</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollview: {
        backgroundColor: '#12163a',
    },
    outer_container: {
        flex: 1,
        padding: 20,
    },
    main_container: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
        textAlign: 'center',
    },
    pressable: {
        backgroundColor: '#4b5ae1',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    pressable_text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modal_scrollview: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modal_container: {
        margin: 50,
        backgroundColor: '#1f1f3d',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    modalContent: {
        width: '100%',
        alignItems: 'center',
    },
    userCard: {
        backgroundColor: '#2d2d5a',
        padding: 20,
        borderRadius: 15,
        marginBottom: 10,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    text: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 15,
        marginBottom: 20,
        width: '100%',
        fontSize: 16,
        borderColor: '#4b5ae1',
        borderWidth: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
});
