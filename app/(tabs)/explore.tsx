import { Input, View, useTheme } from "tamagui";
import MapView from "react-native-maps";
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import Color from "color";

export default function Explore() {
  const theme = useTheme();

  const [location] = useState({
    latitude: 8.291058,
    longitude: -62.7917397,
  });

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      const lct = await Location.getCurrentPositionAsync({});

      setTimeout(() => {
        mapRef.current?.animateCamera({
          center: {
            latitude: lct.coords.latitude,
            longitude: lct.coords.longitude,
          },
          zoom: 16,
        });
      }, 1000);
    })();
  }, []);

  const parseColor = (color: string): string => {
    return Color(color).hex();
  };

  const colors = {
    text: parseColor(theme.color12.get()),
    textSecondary: parseColor(theme.color11.get()),
    stroke: parseColor(theme.color6.get()),
    water: parseColor(theme.background.get()),
    background: parseColor(theme.background.get()),
    superface: parseColor(theme.color3.get()),
    road: parseColor(theme.color5.get()),
  };

  return (
    <View flex={1} position="relative">
      <View
        position="absolute"
        zIndex={10}
        top="#0"
        left="$0"
        right="$0"
        padding="$4"
      >
        <Input placeholder="Busca un lugar..." />
      </View>

      <MapView
        ref={mapRef}
        style={{ width: "100%", height: "100%" }}
        provider="google"
        initialCamera={{
          center: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
          pitch: 0,
          heading: 0,
          altitude: 0,
          zoom: 10.5,
        }}
        rotateEnabled={false}
        showsUserLocation
        followsUserLocation
        toolbarEnabled={false}
        showsMyLocationButton={false}
        showsCompass={false}
        loadingBackgroundColor={colors.background}
        loadingIndicatorColor={colors.text}
        customMapStyle={[
          {
            elementType: "geometry",
            stylers: [
              {
                color: colors.superface,
              },
            ],
          },
          {
            elementType: "labels.icon",
            stylers: [
              {
                visibility: "off",
              },
            ],
          },
          {
            elementType: "labels.text.fill",
            stylers: [
              {
                color: colors.text,
              },
            ],
          },
          {
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: colors.stroke,
              },
            ],
          },
          {
            featureType: "administrative",
            elementType: "geometry",
            stylers: [
              {
                color: colors.text,
              },
            ],
          },
          {
            featureType: "administrative.country",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: colors.text,
              },
            ],
          },
          {
            featureType: "administrative.locality",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: colors.text,
              },
            ],
          },
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: colors.text,
              },
            ],
          },
          {
            featureType: "poi.park",
            elementType: "geometry",
            stylers: [
              {
                color: colors.superface,
              },
            ],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: colors.text,
              },
            ],
          },
          {
            featureType: "poi.park",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: colors.stroke,
              },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry.fill",
            stylers: [
              {
                color: colors.road,
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: colors.textSecondary,
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "geometry",
            stylers: [
              {
                color: colors.road,
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "geometry",
            stylers: [
              {
                color: colors.road,
              },
            ],
          },
          {
            featureType: "road.highway.controlled_access",
            elementType: "geometry",
            stylers: [
              {
                color: colors.road,
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: colors.textSecondary,
              },
            ],
          },
          {
            featureType: "transit",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: colors.text,
              },
            ],
          },
          {
            featureType: "water",
            elementType: "geometry",
            stylers: [
              {
                color: colors.water,
              },
            ],
          },
          {
            featureType: "water",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: colors.text,
              },
            ],
          },
        ]}
      ></MapView>
    </View>
  );
}
