import React, { useState } from 'react';
import { StyleSheet, View, TextInput, ScrollView, Switch, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface FormField {
    key: string;
    value: string;
}

export function DictionaryGenerator() {
    const [currentField, setCurrentField] = useState<FormField>({ key: '', value: '' });
    const [fields, setFields] = useState<FormField[]>([]);
    const [useSpecialChars, setUseSpecialChars] = useState(true);
    const [useNumbers, setUseNumbers] = useState(true);
    const [useLeetSpeak, setUseLeetSpeak] = useState(true);

    const addField = () => {
        if (currentField.key && currentField.value) {
            setFields([...fields, currentField]);
            setCurrentField({ key: '', value: '' });
        }
    };

    const removeField = (index: number) => {
        setFields(fields.filter((_, i) => i !== index));
    };

    const generateDictionary = () => {
        if (fields.length < 2) {
            alert("Please add at least 2 fields");
            return;
        }

        // Aquí implementarías la lógica de generación del diccionario
        const dictionary = fields.map(field => field.value);
        router.push({ pathname: "/tester", params: { dictionary: JSON.stringify(dictionary) } });
    };

    return (
        <ThemedView style={styles.container}>
            <ThemedText style={styles.title}>Dictionary Generator</ThemedText>
            
            <View style={styles.inputContainer}>
                <TextInput
                    placeholder="Field name"
                    value={currentField.key}
                    onChangeText={(text) => setCurrentField({ ...currentField, key: text })}
                    style={styles.input}
                    placeholderTextColor="#666"
                />
                <TextInput
                    placeholder="Value"
                    value={currentField.value}
                    onChangeText={(text) => setCurrentField({ ...currentField, value: text })}
                    style={styles.input}
                    placeholderTextColor="#666"
                />
                <TouchableOpacity onPress={addField} style={styles.addButton}>
                    <ThemedText>Add</ThemedText>
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.fieldsList}>
                {fields.map((field, index) => (
                    <View key={index} style={styles.fieldItem}>
                        <ThemedText>{`${field.key}: ${field.value}`}</ThemedText>
                        <TouchableOpacity
                            onPress={() => removeField(index)}
                            style={styles.removeButton}
                        >
                            <Text style={styles.removeButtonText}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.optionsContainer}>
                <View style={styles.optionRow}>
                    <Switch
                        value={useSpecialChars}
                        onValueChange={setUseSpecialChars}
                    />
                    <ThemedText>Use special characters</ThemedText>
                </View>
                
                <View style={styles.optionRow}>
                    <Switch
                        value={useNumbers}
                        onValueChange={setUseNumbers}
                    />
                    <ThemedText>Use numbers</ThemedText>
                </View>
                
                <View style={styles.optionRow}>
                    <Switch
                        value={useLeetSpeak}
                        onValueChange={setUseLeetSpeak}
                    />
                    <ThemedText>Use leet speak</ThemedText>
                </View>
            </View>

            <TouchableOpacity
                onPress={generateDictionary}
                style={[styles.generateButton, fields.length < 2 && styles.generateButtonDisabled]}
                disabled={fields.length < 2}
            >
                <ThemedText style={styles.generateButtonText}>Generate Dictionary</ThemedText>
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
        flexDirection: 'row',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        marginRight: 10,
        padding: 10,
        backgroundColor: '#2a2a2a',
        color: '#ffffff',
        borderRadius: 5,
    },
    addButton: {
        backgroundColor: '#2e6ddf',
        padding: 10,
        borderRadius: 5,
        justifyContent: 'center',
    },
    fieldsList: {
        flex: 1,
        marginBottom: 20,
    },
    fieldItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#2a2a2a',
        borderRadius: 5,
    },
    removeButton: {
        backgroundColor: '#df2e2e',
        padding: 5,
        borderRadius: 5,
    },
    removeButtonText: {
        color: '#ffffff',
    },
    optionsContainer: {
        marginBottom: 20,
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    generateButton: {
        backgroundColor: '#2e6ddf',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    generateButtonDisabled: {
        opacity: 0.5,
    },
    generateButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});