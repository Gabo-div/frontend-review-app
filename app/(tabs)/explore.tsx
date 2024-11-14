import { Input, View, Sheet, AnimatePresence } from "tamagui";
import MapView from "react-native-maps";
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { POI } from "@/models/POI";
import Map from "@/components/explore/Map";
import PlaceDetails from "@/components/PlaceDetails";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Explore() {
  const insets = useSafeAreaInsets();

  const [location] = useState({
    latitude: 8.291058,
    longitude: -62.7917397,
  });

  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);

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

  const onPoiClick = (poi: POI) => {
    setSelectedPOI(poi);

    mapRef.current?.animateCamera({
      center: {
        latitude: poi.coordinate.latitude,
        longitude: poi.coordinate.longitude,
      },
    });
  };

  const isSheetOpen = !!selectedPOI;

  console.log(selectedPOI);

  return (
    <View flex={1} position="relative">
      <Map ref={mapRef} initialCoords={location} onPoiClick={onPoiClick} />

      <AnimatePresence>
        {!isSheetOpen ? (
          <View
            position="absolute"
            zIndex={10}
            top="#0"
            left="$0"
            right="$0"
            padding="$2"
            style={{ marginTop: insets.top }}
            animation="quick"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          >
            <Input placeholder="Busca un lugar..." />
          </View>
        ) : null}
      </AnimatePresence>

      <Sheet
        forceRemoveScrollEnabled={!!selectedPOI}
        open={isSheetOpen}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setSelectedPOI(null);
          }
        }}
        dismissOnSnapToBottom
        zIndex={100_000}
        animation="quick"
        snapPoints={[95]}
        modal
      >
        <Sheet.Overlay
          animation="quick"
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />

        <Sheet.Handle backgroundColor="$color12" opacity={1} />
        <Sheet.Frame
          backgroundColor="$color2"
          borderTopLeftRadius="$radius.9"
          borderTopRightRadius="$radius.9"
        >
          {selectedPOI ? <PlaceDetails POI={selectedPOI} /> : null}
        </Sheet.Frame>
      </Sheet>
    </View>
  );
}
