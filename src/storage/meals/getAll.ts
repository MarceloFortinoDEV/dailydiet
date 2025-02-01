import AsyncStorage from "@react-native-async-storage/async-storage";
import { MEALS } from "../storage.config";

interface Meal {
    id: string;
    name: string
    description?: string
    date: string
    time: string
    onDiet: boolean
}

export default async function getAll() {
    try {
        
        const storage = await AsyncStorage.getItem(MEALS)

        const meals: Meal[] = storage ? JSON.parse(storage) : []

        return meals

    } catch(error) {
        throw error;
    }
}