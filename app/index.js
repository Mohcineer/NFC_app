import { StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { router } from "expo-router";
import { useEffect } from "react";
import { supabase } from "../lib/supabase-client";


export default function IndexJs() {
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(data.session)
      if (session) {
        router.replace("/(tabs)/home/");
      } else {
        console.log("no use logout 1r");

      }
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      console.log('->', session);
      if (session) {
        router.replace("/(tabs)/home/");
      } else {
        console.log("no user logout 2");
        router.replace("/(auth)/login");
      }
    });
  }, []);


  return (
    <Redirect href="/(auth)/login" />
  );

  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color:'black',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
