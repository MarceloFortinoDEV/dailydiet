import { useNavigation, useRoute } from "@react-navigation/native";
import { View, Text, Image, SafeAreaView, StatusBar } from "react-native";
import imgDiet from '../../../assets/ondiet.png'
import imgOffDiet from '../../../assets/offdiet.png'
import { TouchableButton } from "~/components/button";

interface RouteParams {
    onDiet: boolean
}

export function Success() {

    const navigation = useNavigation()
    
    const route = useRoute()

    const { onDiet } = route.params as RouteParams

    function redirectHome() {
        navigation.navigate('home')
    }

    return(
        <SafeAreaView className='bg-white flex justify-center items-center h-screen'>
            <StatusBar backgroundColor={'#fff'}/>
            {onDiet ? (
                <View className='flex justify-center items-center'>
                    <Text className='text-[#639339] text-3xl font-semibold mb-5'>Continue assim!</Text>
                    <Text className='text-center text-xl mb-5'>Você continua <Text className='font-semibold'>dentro da dieta.</Text> Muito bem!</Text>
                    <Image className='w-56 h-80 mt-10 mb-5' source={imgDiet}/>
                    <TouchableButton onPress={redirectHome}>Ir para página inicial</TouchableButton>
                </View>
            ) : (
                <View className='flex justify-center items-center'>
                    <Text className='text-[#BF3B44] text-3xl font-semibold mb-5'>Que pena!</Text>
                    <Text className='text-center text-xl mb-5'>Você <Text className='font-semibold'>saiu da dieta</Text> dessa vez, mas continue se esforçando e não desista!</Text>
                    <Image className='w-56 h-80 mt-10 mb-5' source={imgOffDiet}/>
                    <TouchableButton onPress={redirectHome}>Ir para página inicial</TouchableButton>
            </View>
            )}
        </SafeAreaView>
    )
}