import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import getAll from "~/storage/meals/getAll";
import { TouchableButton } from "../button";
import { ArrowUpRight } from "phosphor-react-native";

interface Meal {
    id: string;
    name: string
    description?: string
    date: string
    time: string
    onDiet: boolean
}

export default function Percentage() {

    const [meals, setMeals] = useState<Meal[]>()

    const [percentagen, setPercentagen] = useState<number>()

    const [percentage, setPercentage] = useState('')

    async function fetchMeals() {
        const storage = await getAll()

        setMeals(storage || [])
    }

    async function percentageGet() {
        
        await new Promise(resolve => setTimeout(resolve, 50))

        const total = meals?.length || 0

        const dietCount = meals?.filter(item => item.onDiet).length || 0

        const percentage = total > 0 ? (dietCount / total) * 100 : 0;
        
        const formattedPercentage = percentage.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });

        setPercentagen(percentage)
        
        setPercentage(formattedPercentage)
    }

    useEffect(() => {
        fetchMeals()
    })

    useEffect(() => {
        percentageGet()
    })

    return(
        <View className={`${(percentagen ?? 0) >= 51 ? ('bg-[#E5F0DB]') : ('bg-[#F4E6E7]')} mt-5 mb-5 px-5 py-5 rounded-lg`}>
            <View className='flex justify-end items-end'><ArrowUpRight color={`${(percentagen ?? 0) >= 51 ? ('#E5F0DB') : ('#F4E6E7')}`} size={30}/></View>
            <Text className={`${(percentagen ?? 0) >= 51 ? ('text-[#1B1D1E]') : ('text-[#1e1b1b]')} text-center text-4xl font-bold`}>{percentage}%</Text>
            <Text className={`${(percentagen ?? 0) >= 51 ? ('text-[#1B1D1E]') : ('text-[#1e1b1b]')} text-center mt-2 mb-5`}>das refeições dentro da dieta.</Text>
        </View>
    )
}