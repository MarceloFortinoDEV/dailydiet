export declare global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined,
            newmeal: undefined,
            success: {
                onDiet: boolean
            },
            meal: {
                id: string,
                name: string,
                description?: string,
                date: string,
                time: string,
                onDiet: boolean
            },
            editmeal: {
                id: string,
                name: string,
                description?: string,
                date: string,
                time: string,
                onDiet: boolean
            }
        }
    }
}