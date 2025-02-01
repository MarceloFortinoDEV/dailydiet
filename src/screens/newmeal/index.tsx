import { useNavigation } from '@react-navigation/native';
import 'global.css';
import { useState } from 'react';
import { SafeAreaView, StatusBar, View, Text, Alert } from 'react-native';
import { TouchableButton } from '~/components/button';
import Header from '~/components/header';
import { Input } from '~/components/input';
import getAll from '~/storage/meals/getAll';
import newMeal from '~/storage/meals/newMeal';

export default function NewMeal() {

  const navigation = useNavigation()

  const [name, setName] = useState('')

  const [description, setDescription] = useState('')

  const [date, setDate] = useState('')

  const [time, setTime] = useState('')

  const [diet, setDiet] = useState('')

  async function newDiet() {
    if (name && description && date && time && diet) {

      const meals =  getAll()

      const meal = {
        id: `${(await meals).length + 1}`,
        name: name,
        description: description,
        date: date,
        time: time,
        onDiet: diet === '1',
      }

      await newMeal(meal)

      navigation.navigate('success', { onDiet: diet === '1' })
    } else {
      Alert.alert(`É necessário preencher todos os campos`)
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-[#e6eaf1]'>
        <View className='flex-1'>
            <StatusBar backgroundColor={'#e6eaf1'}/>
            <View className='flex px-10 py-2 bg-[#e6eaf1]'>
                <Header type='ArrowBack' name='Nova refeição'/>
            </View>
            <View className='flex-1 flex-col justify-between gap-5 mt-4 p-10 rounded-t-[30px] bg-white'>
              <View className='flex gap-5'>
                <Input header='Nome' placeholder='Nome do alimento' onChangeText={setName} />
                <Input header='Descrição' area placeholder='Descrição do alimento' onChangeText={setDescription} />
                <View className='flex flex-row justify-between gap-2'>
                  <Input header='Data' type='date' placeholder='Selecione a data' onChangeText={setDate} />
                  <Input header='Hora' type='time' placeholder='Selecione o horário' onChangeText={setTime} />
                </View>

                <Input header='Está dentro da dieta?' type='select' onChangeText={setDiet} />

              </View>

              <TouchableButton onPress={newDiet}>Cadastrar refeição</TouchableButton>
            </View>
        </View>
    </SafeAreaView>
  );
}
