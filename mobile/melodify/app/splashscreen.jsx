import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


export default function App(){
    const logospot = './logomelo';

    return(
        <View style={styles.container}>
            <LinearGradient
            colors={['#12163a', 'transparent']}
            style={styles.background}
            />
                <Image
                style={styles.logo}
                source={{
                uri: logospot
                }}
                /> 
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#12163a',
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 500,
      },
    logo: {
        width: 250,
        height: 250,
        backgroundColor: 'transparent'
    },
});