import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, FlatList, TouchableOpacity, TextInput, TabBarIcon } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function HomeScreen({ navigation }) {

  const [personas, setPersonas] = useState([

    { id: '1', nombre: 'Antonio Morlanes', edad: 34, sexo: 'Varón' },
    { id: '2', nombre: 'Margarita Fuentes', edad: 29, sexo: 'Mujer' },
    { id: '3', nombre: 'Manuel Machado', edad: 83, sexo: 'Varón' }

  ]);

  return (
    <View>
      <FlatList
        data={personas}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('Detalles de Usuario', item)}>
            <Text style={style.item}> {item.nombre} </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function informacionScreen() {
  return (
    <View>
      <Text style={style.texto}>
        Esta App te permite conocer en más profundidad a las personas.
      </Text>
    </View>
  );
}

function DetallesScreen({ navigation, route }) {
  return (
    <View>
      <Text style={style.item}>
        Nombre: {route.params.nombre}
      </Text>
      <Text style={style.item}>
        Edad: {route.params.edad}
      </Text>
      <Text style={style.item}>
        Sexo: {route.params.sexo}
      </Text>
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Listado de usuarios" component={HomeScreen} initialParams={{}} options={{
        title: 'Listado de usuarios',
        headerTitleAlign:'center',
        headerStyle: {
          backgroundColor: "#ff4a2c",           
        },        
        headerTintColor: '#fff',
      }} />
      <HomeStack.Screen name="Detalles de Usuario" component={DetallesScreen} options={{
        title: 'Detalles de usuario',
        headerTitleAlign:'center',
        headerStyle:{
          backgroundColor:"#ff4a2c"
        },
        headerTintColor:'#fff',
      }}/>
    </HomeStack.Navigator>
  );
}


export default function App() {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Listado de usuarios" component={HomeStackScreen} options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color="red" size={30} />
          ),        
        }}
        />
        <Tab.Screen name="Información" component={informacionScreen} options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="information" color="red" size={30} />
          ),
          headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:"#ff4a2c"
          },
          headerTintColor:'#fff',
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const style = StyleSheet.create({
  texto: {
    marginTop: 190,
    textAlign: 'center',
    fontSize: 20
  },
  item:{
    marginTop:16,
    marginLeft:12, 
  },  
});
