import AsyncStorage from "@react-native-async-storage/async-storage";

import { MEALS } from "../storage.config";
import getAll from "./getAll";

export default async function DeleteMeal(mealId: string) {
    try {

        const meals = await getAll()

        const filtered = meals.filter(meal => meal.id !== mealId)

        await AsyncStorage.setItem(MEALS, JSON.stringify(filtered))

    } catch(error) {
        throw error;
    }
}