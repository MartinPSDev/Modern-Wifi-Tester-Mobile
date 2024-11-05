import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

export function PasswordTester() {
    const params = useLocalSearchParams();
    const [ssid, setSsid] = useState('');
    const [isTesting, setIsTesting] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentPassword, setCurrentPassword] = useState('');
    const [logs, setLogs] = useState<string[]>([]);
    const dictionary = params.dictionary ? JSON.parse(params.dictionary as string) : [];

    const startTesting = () => {
        if (!ssid) {
            alert('Please enter a network SSID');
            return;
        }

        setIsTesting(true);
        setProgress(0);
        setLogs([]);

        // Simulate password testing
        const testPasswords = async () => {
            for (let i = 0; i < dictionary.length; i++) {
                if (!isTesting) break;

                const password = dictionary[i];
                setCurrentPassword(password);
                setProgress((i + 1) / dictionary.length);
                setLogs(prev => [...prev, `Testing password: ${password}`]);

                await new Promise(resolve => setTimeout(resolve, 1000));
            }
            setIsTesting(false);
        };

        testPasswords();
    };

    const stopTesting = () => {
        setIsTesting(false);
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>Password Tester</ThemedText>

            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Network SSID"
                    value={ssid}
                    onChangeText={setSsid}
                    style={styles.input}
                    placeholderTextColor="#666"
                    editable={!isTesting}
                />
            </View>

            <View style={styles.progressContainer}>
                <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
            </View>

            <ThemedText style={styles.currentPassword}>{currentPassword}</ThemedText>

            <ScrollView style={styles.logs}>
                {logs.map((log, index) => (
                    <ThemedText key={index} style={styles.logEntry}>{log}</ThemedText>
                ))}
            </ScrollView>

            <TouchableOpacity
                onPress={isTesting ? stopTesting : startTesting}
                style={[styles.actionButton, isTesting ? styles.stopButton : styles.startButton]}
            >
                <Text style={styles.buttonText}>
                    {isTesting ? "Stop Testing" : "Start Testing"}
                </Text>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        padding: 10,
        backgroundColor: '#2a2a2a',
        color: '#ffffff',
        borderRadius: 5,
    },
    progressContainer: {
        height: 10,
        backgroundColor: '#2a2a2a',
        borderRadius: 5,
        marginBottom: 20,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#2e6ddf',
    },
    currentPassword: {
        marginBottom: 10,
        textAlign: 'center',
    },
    logs: {
        flex: 1,
        marginBottom: 20,
        backgroundColor: '#2a2a2a',
        borderRadius: 5,
        padding: 10,
    },
    logEntry: {
        marginBottom: 5,
    },
    actionButton: {
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    startButton: {
        backgroundColor: '#2e6ddf',
    },
    stopButton: {
        backgroundColor: '#df2e2e',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});