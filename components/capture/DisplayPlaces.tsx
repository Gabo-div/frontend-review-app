import { PlaceDetails } from "@/models/Place";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { ArrowUpLeft, MapPin } from "@tamagui/lucide-icons";
import { ScrollView, View, Text, Separator } from "tamagui";

interface Props {
    places: Omit<PlaceDetails, "category">[];
    onPressItem: () => void
}

export const DisplayPlaces = ({ places, onPressItem }: Props) => {
    console.log("rendering")
    return (
        <ScrollView paddingHorizontal="$4">
            {/* {isLoading ? (
            <View paddingVertical="$4">
                <Spinner size="large" color="$color" />
            </View>
            ) : null} */}
            {places.length === 0 && (
            <View paddingVertical="$4">
                <Text color="$color11" textAlign="center">
                    No se encontraron resultados
                </Text>
            </View>
            ) }
            {places.map((place) => (
                <Link
                    key={place.address}
                    href={{
                    pathname: "/place",
                    params: {
                        latitude: place.latitude,
                        longitude: place.longitude,
                    },
                    }}
                    style={{ width: "100%" }}
                    onPress={onPressItem}
                >
                    <View width="100%">
                    <View
                        flexDirection="row"
                        paddingVertical="$4"
                        alignItems="center"
                    >
                        <View
                        borderRadius="100%"
                        backgroundColor="$color8"
                        padding="$2"
                        marginRight="$2"
                        >
                            <MapPin />
                        </View>
                        <View flex={1}>
                        {place.name && (
                            <Text numberOfLines={1} ellipsizeMode="tail">
                            {place.name}
                            </Text>
                        )}
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            fontSize="$2"
                            color="$color11"
                        >
                            {place.address}
                        </Text>
                        </View>

                        <ArrowUpLeft marginLeft="$2" size={18} />
                    </View>
                    <Separator />
                    </View>
                </Link>
                ))
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: "rgba(0, 0, 0, 0.9)",
        // justifyContent: "center",
        // alignItems: "center",
    },
})