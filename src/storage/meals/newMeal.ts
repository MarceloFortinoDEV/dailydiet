import AsyncStorage from "@react-native-async-storage/async-storage";

import { MEALS } from "../storage.config";
import getAll from "./getAll";

interface Meal {
    id: string;
    name: string
    description?: string
    date: string
    time: string
    onDiet: boolean
}

export default async function newMeal(meal: Meal) {
    try {

        const meals = await getAll()

        await AsyncStorage.setItem(MEALS, JSON.stringify([...meals, meal]))

    } catch(error) {
        throw error;
    }
}