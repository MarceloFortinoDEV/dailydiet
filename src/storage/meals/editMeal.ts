import AsyncStorage from "@react-native-async-storage/async-storage";

import { MEALS } from "../storage.config";
import getAll from "./getAll";
import DeleteMeal from "./deleteMeal";

interface Meal {
    id: string;
    name: string
    description?: string
    date: string
    time: string
    onDiet: boolean
}

export default async function editMeal(meal: Meal) {
    try {

        await DeleteMeal(meal.id)

        const meals = await getAll()

        const newMeal = {
            id: meals.length + 1,
            name: meal.name,
            description: meal.description,
            date: meal.date,
            time: meal.time,
            onDiet: meal.onDiet,
        }

        await AsyncStorage.setItem(MEALS, JSON.stringify([...meals, newMeal]))

    } catch(error) {
        throw error;
    }
}