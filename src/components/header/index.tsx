import 'global.css'
import { Image, TouchableOpacity, View, Text } from 'react-native'
import Logo from '../../assets/logo.png'
import { ArrowLeft } from 'phosphor-react-native'
import { useNavigation } from '@react-navigation/native'

interface Props {
    type?: 'Default' | 'ArrowBack'
    name?: string
}

export default function Header({ type = 'Default', name }: Props) {
    
    const navigation = useNavigation()

    function redirectBack() {
        navigation.goBack()
    }

    return (
        <View>
            {type === 'Default' ? (
                <View className='flex-row justify-start'>
                    <Image className='h-14 w-28' source={Logo} />
                </View>
            ) : (
                <View className='flex flex-row justify-start items-center'>
                    <TouchableOpacity onPress={redirectBack}>
                        <ArrowLeft size={39} />
                    </TouchableOpacity>
                    <View className='justify-self-center'>
                        <Text className='text-2xl font-bold ml-5'>{name}</Text>
                    </View>
                </View>
            )}
        </View>
    )
}