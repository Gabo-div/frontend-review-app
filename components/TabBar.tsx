import { View, getToken } from "tamagui";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import TabBarItem from "./TabBarItem";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View
      flexDirection="row"
      bottom="$0"
      left="$0"
      width="100%"
      borderTopColor="$borderColor"
      borderTopWidth="$0.5"
      paddingVertical="$3"
      paddingHorizontal="$2"
      backgroundColor="$background"
      justifyContent="space-between"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label = options.title ?? route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <TabBarItem
            key={route.key}
            isFocused={isFocused}
            onPress={onPress}
            label={label}
            icon={
              options.tabBarIcon
                ? options.tabBarIcon({
                    focused: isFocused,
                    color: "$color12",
                    size: getToken("$1"),
                  })
                : null
            }
          />
        );
      })}
    </View>
  );
}
