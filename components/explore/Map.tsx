import { POI } from "@/models/POI";
import Color from "color";
import { forwardRef } from "react";
import MapView from "react-native-maps";
import { useTheme } from "tamagui";

interface Props {
  initialCoords: {
    latitude: number;
    longitude: number;
  };
  onPoiClick: (poi: POI) => void;
}

/* eslint-disable react/display-name */
const Map = forwardRef<React.ElementRef<typeof MapView>, Props>(function (
  { initialCoords, onPoiClick },
  ref,
) {
  const theme = useTheme();

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
    <MapView
      ref={ref}
      onPoiClick={(e) => onPoiClick(e.nativeEvent)}
      style={{ width: "100%", height: "100%" }}
      provider="google"
      initialCamera={{
        center: {
          latitude: initialCoords.latitude,
          longitude: initialCoords.longitude,
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
    />
  );
});

export default Map;
