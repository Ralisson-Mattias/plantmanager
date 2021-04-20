import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { Confirmation } from '../pages/Confirmation'
import { UserIdentification } from '../pages/UserIdentification'
import { Welcome } from '../pages/Welcome'
import colors from '../styles/colors'


const StackRoutes = createStackNavigator()

const AppRoutes: React.FC = () => (
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

    </StackRoutes.Navigator>
)

export default AppRoutes