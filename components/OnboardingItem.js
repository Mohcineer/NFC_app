import React from  "react";
import { View, Text, StyleSheet, Image, useWindowDimensions } from "react-native";
import slides from "../slides";

export default Onboarding = ({item}) => {
    const {width} = useWindowDimensions();

    return (
        <View style={[styles.container, { width }]}>
            <Image source={item.image} style={[styles.image, {width, resizeMode: 'contain'}]} />

            <View style={{flex:0.3}}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        fontSize: 28,

    },
    image: {
        flex: 0.5,
        //justifyContent: 'center',
        width: 600, 
        height: 350,
    
    },
    title: {
        fontWeight: '800',
        fontSize: 28,
        marginBottom: 10,
        color: '#a3b18a',
        textAlign: 'center',
    },
    description: {
        fontWeight: '300',
        color: '#62656b',
        textAlign: 'center',
        paddingHorizontal: 64,
    }
});