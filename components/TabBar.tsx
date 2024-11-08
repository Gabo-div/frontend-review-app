import { Text, View, getToken } from "tamagui";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";

export default function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  return (
    <View
      flexDirection="row"
      bottom="$0"
      gap="$2"
      left="$0"
      width="100%"
      justifyContent="space-evenly"
      borderTopColor="$borderColor"
      borderTopWidth="$0.5"
      paddingVertical="$2"
      backgroundColor="$background"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

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
          <View alignItems="center" gap="$1" onPress={onPress} key={index}>
            <View
              height="$3"
              paddingHorizontal="$3"
              borderRadius="$radius.3"
              justifyContent="center"
              alignItems="center"
              backgroundColor={isFocused ? "$color4" : "$background"}
            >
              {options.tabBarIcon
                ? options.tabBarIcon({
                    focused: isFocused,
                    color: "#fff",
                    size: getToken("$1"),
                  })
                : null}
            </View>
            <Text>{label}</Text>
          </View>
        );
      })}
    </View>
  );
}
