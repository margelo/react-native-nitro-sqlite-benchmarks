import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Benchmarks",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "flash" : "flash-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
