import 'global.css'
import { useState, useCallback, useEffect } from 'react'
import { TextInput, View, Text, TouchableOpacity } from 'react-native'
import { TextInputProps } from 'react-native'
import { DatePickerModal, TimePickerModal } from 'react-native-paper-dates'

interface Props extends TextInputProps {
    header?: string
    type?: 'date' | 'text' | 'time' | 'select'
    onDiet?: string
    area?: boolean
    onChangeText: (text: string) => void;
}

export function Input({ header, type = 'text', onDiet, area, onChangeText, ...rest }: Props) {

    const [date, setDate] = useState<Date>()
    
    const [time, setTime] = useState<string>()

    const [dateOpen, setDateOpen] = useState(false)

    const [timeOpen, setTimeOpen] = useState(false)

    const [selected, setSelected] = useState(onDiet)

    const SubmitedDate = useCallback(
        (params: { date: Date | undefined }) => {
            setDateOpen(false);
            if (params.date) {
                setDate(params.date);
                onChangeText(params.date.toISOString())
            }
        },
        [setDateOpen, setDate]
    );

    const SubmitedTime = useCallback(
        ({ hours, minutes }: { hours: number; minutes: number }) => {
          setTimeOpen(false);
          setTime(`${hours.toString()}:${minutes.toString()}`);
            
          onChangeText(`${hours.toString()}:${minutes.toString()}`)

        },
        []
    );

    const selectedChange = (selected: string) => {
        setSelected(selected)

        onChangeText(selected)
    }

    return (
        <View className='flex-auto flex-col gap-1'>
            <Text className='font-semibold text-gray-700 text-[15px]'>{header}</Text>
            {type === 'text' && (<TextInput multiline className={`border-[1px] w-full min-w-full rounded-md ${area && ('h-52')} px-5 py-4 border-gray-300 border-solid flex justify-center items-center text-start`} onChangeText={onChangeText} {...rest} />)}

            {type === 'date' && (<TextInput multiline value={date ? date.toLocaleDateString('pt-br') : ''} onPress={() => setDateOpen(true)} className={`border-[1px] w-full min-w-full rounded-md ${area && ('h-52')} px-5 py-4 border-gray-300 border-solid flex justify-center items-center text-start`} {...rest} />)}

            {type === 'time' && (<TextInput multiline value={time} onPress={() => setTimeOpen(true)} className={`border-[1px] w-full min-w-full rounded-md ${area && ('h-52')} px-5 py-4 border-gray-300 border-solid flex justify-center items-center text-start`} {...rest} />)}

            {type === 'select' && (
                <View className='flex flex-row gap-2'>

                <TextInput multiline value={selected} className={`border-[1px] w-full hidden min-w-full rounded-md ${area && ('h-52')} px-5 py-4 border-gray-300 border-solid flex justify-center items-center text-start`} {...rest} />

                    {selected === '1' ? (
                        <View className='bg-green-300/20 flex-1 flex-row gap-2 justify-center items-center border-2 border-green-500 border-solid p-5 rounded-lg'>
                            <View className='size-4 bg-green-500 rounded-lg'/>
                            <Text className='text-xl font-bold'>Sim</Text>
                        </View>
                    ) : (
                        <TouchableOpacity className='bg-gray-300/20 flex-1 flex-row gap-2 border-2 border-transparent border-solid justify-center items-center p-5 rounded-lg' onPress={() => selectedChange('1')}>
                            <View className='size-4 bg-green-500 rounded-lg'/>
                            <Text className='text-xl font-bold'>Sim</Text>
                        </TouchableOpacity>
                    )}

                    {selected === '2' ? (
                        <View className='bg-red-300/20 flex-1 flex-row gap-2 justify-center items-center border-2 border-red-500 border-solid p-5 rounded-lg'>
                            <View className='size-4 bg-red-500 rounded-lg'/>
                            <Text className='text-xl font-bold'>Não</Text>
                        </View>
                    ) : (
                        <TouchableOpacity className='bg-gray-300/20 flex-1 flex-row gap-2 border-2 border-transparent border-solid justify-center items-center p-5 rounded-lg' onPress={() => selectedChange('2')}>
                            <View className='size-4 bg-red-500 rounded-lg'/>
                            <Text className='text-xl font-bold'>Não</Text>
                        </TouchableOpacity>
                    )}

                </View>
            )}

            <DatePickerModal visible={dateOpen} locale='pt' mode='single' date={new Date()} onDismiss={() => setDateOpen(false)} onConfirm={SubmitedDate} />

            <TimePickerModal visible={timeOpen} hours={20} minutes={20} onDismiss={() => setTimeOpen(false)} onConfirm={SubmitedTime} />
        </View>
    )
}