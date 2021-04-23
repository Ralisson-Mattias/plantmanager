import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import StackRoutes from './stack.routes'
import AsyncStorage from '@react-native-async-storage/async-storage'
import AuthRoutes from './tab.routes'

const Routes = () => {

    const [userName, setUserName] = useState<string>('')

    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user')
            setUserName(user || '')
        }

        loadStorageUserName()
    }, [])

    return (
        <NavigationContainer>
            <StackRoutes />
        </NavigationContainer>
    )
}

export default Routes