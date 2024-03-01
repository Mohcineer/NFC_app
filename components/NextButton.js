
import { StyleSheet, View, TouchableOpacity, Animated} from 'react-native';
import {AntDesign} from '@expo/vector-icons';

export default NextButton = ({percentage}) => {
  return (
    <View styel={styles.container}>
      <TouchableOpacity style={styles.button} active Opacity={0.6}>

        <AntDesign name="arrowright" size={32} color="white"/>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
        
    },
    button: { 
        position: 'absolute',
        backgroundColor: '#a3b18a',
        borderRadius:100,
        padding:20,

    }

})