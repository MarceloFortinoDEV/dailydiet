import { useNavigation, useRoute } from '@react-navigation/native';
import 'global.css';
import { useState } from 'react';
import { Alert, SafeAreaView, StatusBar, View } from 'react-native';
import { TouchableButton } from '~/components/button';
import Header from '~/components/header';
import { Input } from '~/components/input';
import editMeal from '~/storage/meals/editMeal';

interface RouteParams {
  id: string,
  name: string
  description: string
  date: string
  time: string
  onDiet: boolean
}

export default function EditMeal() {

  const navigation = useNavigation()

  const route = useRoute()

  const { id, name, description, date, time, onDiet } = route.params as RouteParams

  const [editname, setName] = useState(name)

  const [editdescription, setDescription] = useState(description)

  const [editdate, setDate] = useState(new Date(date).toISOString())

  const [edittime, setTime] = useState(time)

  const [editdiet, setDiet] = useState(onDiet === true ? '1' : '2')

  async function Edit() {
    if (editname && editdescription && editdate && edittime && editdiet) {
      const meal = {
        id: id,
        name: editname,
        description: editdescription,
        date: editdate,
        time: edittime,
        onDiet: editdiet === '1' ? true : false,
      }
  
      await editMeal(meal)

      navigation.navigate('home')
    } else {
      Alert.alert('Preencha todos os campos')
    }
  }

  return (
    <SafeAreaView className='flex-1 bg-[#e6eaf1]'>
        <View className='flex-1'>
            <StatusBar backgroundColor={'#e6eaf1'}/>
            <View className='flex px-10 py-2 bg-[#e6eaf1]'>
                <Header type='ArrowBack' name='Editar refeição'/>
            </View>
            <View className='flex-1 flex-col justify-between gap-5 mt-4 p-10 rounded-t-[30px] bg-white'>
              <View className='flex gap-5'>
                <Input header='Nome' placeholder='Nome do alimento' value={editname} onChangeText={setName} />
                <Input header='Descrição' area placeholder='Descrição do alimento' value={editdescription} onChangeText={setDescription} />
                <View className='flex flex-row justify-between gap-2'>
                  <Input header='Data' type='date' placeholder='Selecione a data' value={new Date(editdate).toLocaleDateString()} onChangeText={setDate} />
                  <Input header='Hora' type='time' placeholder='Selecione o horário' value={edittime} onChangeText={setTime} />
                </View>

                <Input header='Está dentro da dieta?' type='select' onDiet={editdiet} onChangeText={setDiet} />

              </View>

              <TouchableButton onPress={Edit}>Salvar alterações</TouchableButton>
            </View>
        </View>
    </SafeAreaView>
  );
}
