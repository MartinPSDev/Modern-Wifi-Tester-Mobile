import * as React from "react";
import { useState } from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";
import { MainStackParamList } from "../NavigationParamList";

type DictionaryGeneratorProps = {
    navigation: FrameNavigationProp<MainStackParamList, "Dictionary Generator">,
};

interface FormField {
    key: string;
    value: string;
}

export function DictionaryGenerator({ navigation }: DictionaryGeneratorProps) {
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

        // Here you would implement the dictionary generation logic
        // For now, we'll just navigate to the Password Tester
        navigation.navigate("Password Tester", {
            dictionary: generateCombinations(fields, useSpecialChars, useNumbers, useLeetSpeak)
        });
    };

    return (
        <flexboxLayout style={styles.container}>
            <label className="text-2xl font-bold mb-4">Dictionary Generator</label>
            
            <flexboxLayout style={styles.inputContainer}>
                <textField
                    hint="Field name"
                    text={currentField.key}
                    onTextChange={(e) => setCurrentField({ ...currentField, key: e.value })}
                    style={styles.input}
                />
                <textField
                    hint="Value"
                    text={currentField.value}
                    onTextChange={(e) => setCurrentField({ ...currentField, value: e.value })}
                    style={styles.input}
                />
                <button
                    text="Add"
                    onTap={addField}
                    style={styles.addButton}
                />
            </flexboxLayout>

            <scrollView style={styles.fieldsList}>
                {fields.map((field, index) => (
                    <flexboxLayout key={index} style={styles.fieldItem}>
                        <label text={`${field.key}: ${field.value}`} />
                        <button
                            text="Remove"
                            onTap={() => removeField(index)}
                            style={styles.removeButton}
                        />
                    </flexboxLayout>
                ))}
            </scrollView>

            <flexboxLayout style={styles.optionsContainer}>
                <switch
                    checked={useSpecialChars}
                    onCheckedChange={(e) => setUseSpecialChars(e.value)}
                />
                <label text="Use special characters" />
                
                <switch
                    checked={useNumbers}
                    onCheckedChange={(e) => setUseNumbers(e.value)}
                />
                <label text="Use numbers" />
                
                <switch
                    checked={useLeetSpeak}
                    onCheckedChange={(e) => setUseLeetSpeak(e.value)}
                />
                <label text="Use leet speak" />
            </flexboxLayout>

            <button
                text="Generate Dictionary"
                onTap={generateDictionary}
                style={styles.generateButton}
                className={fields.length < 2 ? 'opacity-50' : ''}
            />
        </flexboxLayout>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#121212',
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
        color: '#ffffff',
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
        color: '#ffffff',
    },
    optionsContainer: {
        marginBottom: 20,
    },
    generateButton: {
        backgroundColor: '#2e6ddf',
        padding: 15,
        borderRadius: 5,
        color: '#ffffff',
    },
});