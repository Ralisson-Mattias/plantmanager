import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Confirmation } from '../pages/Confirmation'
import { MyPlants } from '../pages/MyPlants'
import { PlantSave } from '../pages/PlantSave'
import { PlantSelect } from '../pages/PlantSelect'
import { UserIdentification } from '../pages/UserIdentification'
import { Welcome } from '../pages/Welcome'
import colors from '../styles/colors'
import AuthRoutes from './tab.routes'


const StackRoutes = createStackNavigator()


const AppRoutes = () => {


    return (
        <StackRoutes.Navigator
            headerMode="none"
            screenOptions={{
                cardStyle: {
                    backgroundColor: colors.white
                }
            }}
        >
            <StackRoutes.Screen
                name="Welcome"
                component={Welcome}
            />

            <StackRoutes.Screen
                name="UserIdentification"
                component={UserIdentification}
            />

            <StackRoutes.Screen
                name="Confirmation"
                component={Confirmation}
            />

            <StackRoutes.Screen
                name="PlantSelect"
                component={AuthRoutes}
            />

            {/* <StackRoutes.Screen
            name="PlantSelect"
            component={PlantSelect}
        />
         */}

            <StackRoutes.Screen
                name="PlantSave"
                component={PlantSave}
            />

            <StackRoutes.Screen
                name="MyPlants"
                component={AuthRoutes}
            />

        </StackRoutes.Navigator>
    )

}

export default AppRoutes