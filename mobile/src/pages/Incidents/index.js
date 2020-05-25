import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'; 
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';

import api from '../../services/api';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Incidents() {
    const[incidents, setIncidents] = useState([]);
    const navigation = useNavigation();

    function navigateToDetail() {
        navigation.navigate('Details');
    }

    async function loadIncidents() {
        const response = await api.get('incidents');

        setIncidents(response.data);

        console.log(response.data);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>0 casos</Text>.
                </Text>
            </View>
            <Text> AAABB </Text>
            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList 
                keyExtractor={incident => String(incident.id)}
                data={incidents}
                showsVerticalScrollIndicator={false}
                styles={styles.incidentList}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>
                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>Valor</Text>
                        <Text style={styles.incidentValue}>{incident.value}</Text>

                        <TouchableOpacity 
                            style={styles.detailsButton} 
                            onPress={navigateToDetail}
                        >
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041"></Feather>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}