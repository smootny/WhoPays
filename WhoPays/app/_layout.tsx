import { Stack } from "expo-router";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Start', headerShown: false }}
            />
            <Stack.Screen name="gameScreen" options={{ title: "Game", headerShown: true,
                headerTransparent: true,
            }} />
        </Stack>
    );
}
