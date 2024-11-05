import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { DictionaryGenerator } from "./DictionaryGenerator";
import { PasswordTester } from "./PasswordTester";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Dictionary Generator"
            screenOptions={{
                headerStyle: {
                    backgroundColor: "#1D3D47",
                },
                headerTintColor: "#fff",
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Dictionary Generator"
                component={DictionaryGenerator}
            />
            <StackNavigator.Screen
                name="Password Tester"
                component={PasswordTester}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);