import {  Image, FlatList, StyleSheet } from 'react-native'
import { Text, View } from '../components/Themed';
import productSave from '../data/productSave.json'
import { Avatar, Button, Card, List } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ModalScreen() {
  return (
      <View style={styles.container}>
      
      <FlatList
        data={productSave} 
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => 
        {
          return (
            <Card style={styles.containerCard}>
              <Card.Cover source={{ uri: 'https://luxedefrance.fr/wp-content/uploads/2023/11/IMG_8010.jpg' }} style={{width: 200, height: 150, alignSelf:'center', marginTop: 10}}  />
            <Card.Title title="DIOR B22"/>
            <Card.Content>
            <Text style = {{color:'#494949'}}variant="titleLarge">{item.title}</Text>
              <Text style = {{color:'#494949'}}variant="titleLarge">{item.mainText}</Text>
              <Text style = {{color:'#494949'}}variant="bodyMedium">{item.subText}</Text>
              <Card.Actions > 
                <Button style= {styles.btns}>
            <Icon name="trash" size={22} color="#bf0603" />
            </Button> 
            <Button style= {styles.btns}>
            <Icon name="gear" size={22} color="#90a955" />
            </Button>
            </Card.Actions>
            </Card.Content>
          </Card>
          );
        }}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#dad7cd',
  },
  title: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 50/3,
},

  containerCard: {
    marginBottom: 7,
    alignContent: 'center',
    margin: 10,
    borderRadius: 50/1.5,
   
},
  grandTitre: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#8215A8', 
  },

  btns:{
    backgroundColor:'#dad7cd',
    borderWidth: 1, 
    borderColor: 'transparent', 
    marginEnd: 5,
    borderRadius: 60,
  },

  

});
