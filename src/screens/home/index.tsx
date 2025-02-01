import { useNavigation } from '@react-navigation/native';
import 'global.css';
import { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator, StatusBar, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { TouchableButton } from '~/components/button';
import Header from '~/components/header';
import Percantage from '~/components/percentage';
import getAll from '~/storage/meals/getAll';

interface Meal {
    id: string;
    name: string;
    description?: string;
    date: string;
    time: string;
    onDiet: boolean;
}

export default function Home() {
    const [groupedMeals, setGroupedMeals] = useState<Record<string, Meal[]>>({});
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    function redirectNewMeal() {
        navigation.navigate('newmeal');
    }
    
    function redirectMeal(id:string, name:string, description: string, date: string, time: string, onDiet: boolean) {
        navigation.navigate('meal', { id, name, description, date, time, onDiet })
    }

    async function fetchMeals() {
        const storage = await getAll();

        const sortedMeals = (storage || []).sort((a: Meal, b: Meal) => {
            const dateA = new Date(`${a.date}T${a.time}`);
            const dateB = new Date(`${b.date}T${b.time}`);
            return dateA.getTime() - dateB.getTime();
        });

        const grouped = sortedMeals.reduce((acc: Record<string, Meal[]>, meal) => {
            if (!acc[meal.date]) {
                acc[meal.date] = [];
            }
            acc[meal.date].push(meal);
            return acc;
        }, {});

        setGroupedMeals(grouped);
        setLoading(false);
    }

    useEffect(() => {
        fetchMeals();
    }, []);

    return (
        <SafeAreaView className='h-full'>
            <View className='h-full px-10 py-2'>
                <StatusBar barStyle='dark-content' backgroundColor='#f2f2f2' />
                <Header />
                <Percantage />
                <TouchableButton icon='PLUS' onPress={redirectNewMeal}>Nova refeição</TouchableButton>
                {loading ? (
                    <ActivityIndicator className='mt-10' size='large' />
                ) : (
                    <FlatList
                        className='mt-10 h-full'
                        data={Object.entries(groupedMeals)}
                        keyExtractor={([date]) => date}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item: [date, meals] }) => (
                            <View>
                                <Text className='text-gray-900 text-xl mt-5 font-bold mb-1'>{`${new Date(date).toLocaleDateString('pt-br').replaceAll('/', '.')}`}</Text>
                                {meals.map((meal) => (
                                    <TouchableOpacity key={meal.id} onPress={() => redirectMeal(meal.id, meal.name, meal.description || 'Sem descrição ', meal.date, meal.time, meal.onDiet)} className='border-[1px] border-gray-300 border-solid flex flex-row justify-between rounded-lg mb-2 px-5 py-5'>
                                        <View className='flex flex-row gap-2'>
                                            <Text className='font-semibold'>{meal.time}</Text>
                                            <Text className='text-gray-400'>|</Text>
                                            <Text>{meal.name}</Text>
                                        </View>
                                        <View className={`${meal.onDiet ? 'bg-[#63933990]' : 'bg-[#BF3B4490]'} size-5 rounded-full`} />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                        ListEmptyComponent={<Text>Nenhuma refeição encontrada.</Text>}
                    />
                )}
            </View>
        </SafeAreaView>
    );
}
