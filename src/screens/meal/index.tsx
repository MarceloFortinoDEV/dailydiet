import { useNavigation, useRoute } from '@react-navigation/native';
import 'global.css';
import { useState } from 'react';
import { SafeAreaView, StatusBar, View, Text, Modal, TouchableOpacity } from 'react-native';
import { TouchableButton } from '~/components/button';
import Header from '~/components/header';
import DeleteMeal from '~/storage/meals/deleteMeal';

interface RouteParams {
    id: string,
    name: string,
    description: string,
    date: string,
    time: string,
    onDiet: boolean
}

export default function Meal() {

    const route = useRoute()

    const { id, name, description, date, time, onDiet } = route.params as RouteParams

    const navigation = useNavigation()

    const [open, setOpen] = useState(false)

    function editMeal() {
        navigation.navigate('editmeal', { id, name, description, date, time, onDiet })
    }

    async function deleteMeal() {
        await DeleteMeal(id)

        setOpen(false)

        navigation.navigate('home')
    }

    return (
        <SafeAreaView className={`${onDiet ? ('bg-[#E5F0DB]') : ('bg-[#F4E6E7]')} flex-1`}>
            <View className='flex-1'>
                <StatusBar backgroundColor={onDiet ? ('#E5F0DB') : ('#F4E6E7')}/>
                <View className={`flex px-10 py-2 ${onDiet ? ('bg-[#E5F0DB]') : ('bg-[#F4E6E7]')}`}>
                    <Header type='ArrowBack' name='Refeição'/>
                </View>
                <View className='flex-1 flex-col justify-between gap-5 mt-4 p-10 rounded-t-[30px] bg-white'>
                    <View>
                        <Text className='font-semibold text-3xl'>{name}</Text>
                        <Text>{description}</Text>
                        <Text className='font-semibold text-xl mt-5'>Data e hora</Text>
                        <Text>{new Date(date).toLocaleDateString('pt-br')} às {time}</Text>
                        <View className='flex w-40 flex-row justify-center items-center gap-2 bg-gray-200 mt-2 px-5 py-2 rounded-full'><View className={`${onDiet ? ('bg-[#639339]') : ('bg-[#BF3B44]')} size-3 rounded-full`}/><Text>{onDiet ? ('dentro da dieta') : ('fora da dieta')}</Text></View>
                    </View>

                    <Modal
                        visible={open}
                        transparent
                        animationType="fade"
                        onRequestClose={() => setOpen(false)}
                    >
                        <View className="flex-1 bg-black/40 justify-center items-center">
                        <View className="bg-white rounded-lg p-5 w-4/5 items-center shadow-lg">
                            <Text className="text-2xl font-semibold mb-2 text-center p-5">Deseja realmente excluir o registro da refeição?</Text>
                            <View className='flex flex-row gap-2'>
                                <TouchableButton type='SECONDARY' onPress={() => setOpen(false)}>Cancelar</TouchableButton>
                                <TouchableButton onPress={deleteMeal}>Sim, excluir</TouchableButton>
                            </View>
                        </View>
                        </View>
                    </Modal>

                    <View>
                        <TouchableButton icon='EDIT' onPress={editMeal} >Editar refeição</TouchableButton>
                        <TouchableButton icon='DELETE' onPress={() => setOpen(true)} type='SECONDARY'>Excluir refeição</TouchableButton>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
