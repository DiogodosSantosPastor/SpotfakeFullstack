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
            const response = await fetch(`http://localhost:8000/pesquisa/delete/${email}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.ok) {
                alert("Usuário deletado com sucesso!");
                setEmail("");
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
                            value={emailToDelete}
                            onChangeText={setEmailToDelete}
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
    },
    pressable: {
        backgroundColor: '#4b5ae1',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    pressable_text: {
        color: '#fff',
        fontSize: 18,
    },
    modal_scrollview: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modal_container: {
        margin: 50,
        backgroundColor: '#292e5a',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalContent: {
        width: '100%',
        alignItems: 'center',
    },
    userCard: {
        backgroundColor: '#292e5a',
        padding: 20,
        borderRadius: 10,
        marginBottom: 10,
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        width: '100%',
    },
});
