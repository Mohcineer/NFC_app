import { StyleSheet , View} from 'react-native'
import { Avatar, Button, List, Title } from 'react-native-paper'
import { Text } from '../../components/Themed'
export default function Profil() {
  return (
    
    <View style={styles.container}>
      <Avatar.Text
        size={130}
        label={'ME'}
        style={styles.avatar}
        labelStyle={styles.titleItem}
      />
      <Text style={styles.textCenter}>Mohcine</Text>
      <View style={styles.draw} />
      <View style={{alignSelf:'center', marginTop: 40}} >
        <List.Item
          title="Modifier mes informations"
          titleStyle={styles.titleItem}
          left={(props) => (
            <List.Icon
              {...props}
              icon="file-cog-outline"
              color={'#8215A8'}
            />
          )}
          right={(props) => <List.Icon {...props} icon="arrow-right" />}
          style={styles.listItem}
          onPress={() => router.push('/user/update-user')}
        />
        <List.Item
          title="Modifier mon mot de passe"
          titleStyle={styles.titleItem}
          left={(props) => (
            <List.Icon
              {...props}
              icon="account-cog"
              color={'#8215A8'}
            />
          )}
          right={(props) => <List.Icon {...props} icon="arrow-right" />}
          style={styles.listItem}
          onPress={() => router.push('/user/update-password')}
        />
        <List.Item
          title="Confidentalité et sécurité"
          titleStyle={styles.titleItem}
          left={(props) => (
            <List.Icon
              {...props}
              icon="account-lock-outline"
              color={'#8215A8'}
            />
          )}
          right={(props) => <List.Icon {...props} icon="arrow-right" />}
          style={styles.listItem}
          onPress={() => router.push('/user/delete-user')}
        />
      </View>
      <View style={styles.blockBottom}>
        <Button
          icon="logout"
          style={styles.logout}
          mode="contained"
          labelStyle={{ fontSize: 17 }}
  
        >
          Se déconnecter
        </Button>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  blockBottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 10,
    alignItems: 'center',
  },
  draw: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 30,
    width: '50%',
    alignSelf: 'center',
    marginBottom: 20,
  },
  textCenter: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#8215A8',
    fontSize: 30,
  },
  avatar: {
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 10,
    backgroundColor: '#8215A8',
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 200,
    width: '90%',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    marginTop: 25,
    elevation: 24,
  },
  titleItem: {
  },
  logout: {
    width: 200,
    borderWidth: 2,
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 80,
    backgroundColor: '#8215A8',
  },
})
