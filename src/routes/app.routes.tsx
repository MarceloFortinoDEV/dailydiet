import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditMeal from "~/screens/edit";
import Home from "~/screens/home";
import Meal from "~/screens/meal";
import NewMeal from "~/screens/newmeal";
import { Success } from "~/screens/newmeal/success";

export function AppRoutes() {
    const { Navigator, Screen } = createNativeStackNavigator()

    return (
        <Navigator initialRouteName='home' screenOptions={{ headerShown: false }}>
            <Screen name='home' component={Home} />
            <Screen name='newmeal' component={NewMeal} />
            <Screen name='success' component={Success} />
            <Screen name='meal' component={Meal} />
            <Screen name='editmeal' component={EditMeal} />
        </Navigator>
    )
}