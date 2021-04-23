import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Image, Text, FlatList, Alert } from 'react-native'
import { Header } from '../components/Header'
import colors from '../styles/colors'

import waterdrop from '../assets/waterdrop.png'
import { loadPlant, PlantProps, removePlant } from '../libs/storage'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import fonts from '../styles/fonts'
import { PlantCardSecondary } from '../components/PlantCardSecondary'
import { Load } from '../components/Load'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function MyPlants() {

    const [myplants, setMyPlants] = useState<PlantProps[]>([])
    const [loading, setLoading] = useState(true)
    const [nextWatered, setNextWatered] = useState<string>()


    function handleRemove(plant: PlantProps) {
        Alert.alert("Remover", `Dejesa remover a ${plant.name}?`, [
            {
                text: 'Não 😀',
                style: 'cancel'
            }, {
                text: 'Sim 😑',
                onPress: async () => {
                    try {

                        await removePlant(plant.id)

                        setMyPlants((oldData) =>
                            oldData.filter((item) => item.id !== plant.id)
                        )
                    } catch (error) {
                        Alert.alert("Não foi possivel remover! 😯")
                    }
                }
            }
        ])
    }

    useEffect(() => {
        async function loadStorageData() {
            const plantStoraged = await loadPlant()


            if (plantStoraged.length > 0) {

                const nextTime = formatDistance(
                    new Date(plantStoraged[0].dateTimeNotification).getTime(),
                    new Date().getTime(),
                    { locale: ptBR }
                )

                setNextWatered(
                    `Não esqueça de regar a ${plantStoraged[0].name} à ${nextTime}`
                )
                setMyPlants(plantStoraged)
            }

            setLoading(false)

        }

        loadStorageData()
    }, [])

    if (loading)
        return <Load />

    return (
        <View style={styles.container}>
            <Header />

            {myplants.length > 0 ?
                <>

                    <View style={styles.spotlight}>
                        <Image
                            source={waterdrop}
                            style={styles.spotlightImage}
                        />

                        <Text style={styles.spotlightText}>
                            {nextWatered}
                        </Text>
                    </View>

                    <View style={styles.plants}>
                        <Text style={styles.plantsTitle}>
                            Próximas regadas
                </Text>

                        <FlatList
                            data={myplants}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={({ item }) => (
                                <PlantCardSecondary
                                    data={item}
                                    handleRemove={() => { handleRemove(item) }}
                                />
                            )}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </>
                :
                <View style={styles.noPlantsContainer}>
                    <Text style={styles.noPlantsText}>Sem plantas cadastradas</Text>
                </View>

            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 50,
        backgroundColor: colors.background
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    spotlightImage: {
        width: 60,
        height: 60
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
    },
    plants: {
        flex: 1,
        width: '100%'
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    },
    noPlantsContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    noPlantsText: {
        fontSize: 30,
        fontFamily: fonts.heading,
        color: colors.green_dark,
        textAlign: 'center'
    }
})