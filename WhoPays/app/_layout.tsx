import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'back', headerShown: false, headerTransparent: true}}
            />
            <Stack.Screen
                name="gameScreen"
                options={{
                    title: "Game",
                    headerShown: true,
                    headerTransparent: true,
                    headerTitleStyle: {
                        color: 'transparent'
                    },
                }}
            />
        </Stack>
    );
}
