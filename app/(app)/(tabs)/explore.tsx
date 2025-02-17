import { View, Sheet, Spinner, Button, useTheme } from "tamagui";
import { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { POI } from "@/models/POI";
import DomMap, { DomMapRef, MapState } from "@/components/explore/DomMap";
import PlaceDetails from "@/components/PlaceDetails";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Compass } from "@tamagui/lucide-icons";
import { api } from "@/lib/api";
import SearchInput from "@/components/explore/SearchInput";

export default function Explore() {
  const insets = useSafeAreaInsets();

  const [mapStyles, setMapStyles] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mapState, setMapState] = useState<MapState | null>(null);
  const [selectedPOI, setSelectedPOI] = useState<POI | null>(null);

  const mapRef = useRef<DomMapRef>(null);

  useEffect(() => {
    (async () => {
      if (isLoading) return;
      if (!mapRef.current) return;

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        return;
      }

      const lct = await Location.getCurrentPositionAsync({});

      mapRef.current.moveTo({
        latitude: lct.coords.latitude,
        longitude: lct.coords.longitude,
        zoom: 17,
      });
      mapRef.current.updateUserLocation({
        latitude: lct.coords.latitude,
        longitude: lct.coords.longitude,
      });

      const subscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        (newLocation) => {
          if (!mapRef.current) return;

          mapRef.current.updateUserLocation({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          });
        },
      );

      return () => {
        subscription.remove();
      };
    })();
  }, [isLoading]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/map/styles");
        setMapStyles(res.data);
      } catch (error) {
        console.log({ error });
      }
    })();
  }, []);

  const theme = useTheme();

  const isSheetOpen = !!selectedPOI;

  return (
    <View flex={1} position="relative">
      {isLoading ? (
        <View
          position="absolute"
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="large" color="$color" />
        </View>
      ) : null}

      <DomMap
        ref={mapRef}
        dom={{
          scrollEnabled: false,
          matchContents: true,
          geolocationEnabled: true,
        }}
        mapStyles={mapStyles}
        initialState={{
          // guayana city center
          latitude: 8.291058,
          longitude: -62.7917397,
          zoom: 10,
        }}
        styles={{
          background: theme.background.get(),
          landuse: theme.color1.get(),
          landcover: theme.color1.get(),
          water: theme.color4.get(),
          text: theme.color10.get(),
          line: theme.green2.get(),
          userLocation: theme.green4.get(),
        }}
        onLoad={() => setIsLoading(false)}
        onPoiClick={(poi) => {
          mapRef.current?.moveTo({
            latitude: poi.coordinate.latitude,
            longitude: poi.coordinate.longitude,
          });

          setSelectedPOI(poi);
        }}
        onMove={(state) => setMapState(state)}
      />

      {!isSheetOpen && !isLoading ? (
        <View
          position="absolute"
          zIndex={10}
          top="$0"
          left="$0"
          right="$0"
          padding="$2"
          gap="$2"
          style={{ marginTop: insets.top }}
        >
          <View
            animation="quick"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          >
            <SearchInput />
          </View>

          {mapState && (mapState.pitch !== 0 || mapState.bearing !== 0) ? (
            <View
              flexDirection="row"
              justifyContent="flex-end"
              animation="quick"
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            >
              <Button
                width="$4"
                height="$4"
                onPress={() => {
                  if (!mapRef.current) return;
                  mapRef.current.resetBearing();
                  mapRef.current.resetPitch();
                }}
                icon={<Compass size="$1" />}
              ></Button>
            </View>
          ) : null}
        </View>
      ) : null}

      <Sheet
        forceRemoveScrollEnabled={!!selectedPOI}
        open={isSheetOpen}
        onOpenChange={(open: boolean) => {
          if (!open) {
            setSelectedPOI(null);
          } else {
            setSelectedPOI(selectedPOI);
          }
        }}
        dismissOnSnapToBottom
        zIndex={100_000}
        animation="quick"
        snapPoints={[95]}
        modal
      >
        <Sheet.Overlay />
        <Sheet.Handle backgroundColor="$color12" opacity={1} />
        <Sheet.Frame
          backgroundColor="$color2"
          borderTopLeftRadius="$radius.9"
          borderTopRightRadius="$radius.9"
        >
          {selectedPOI ? (
            <PlaceDetails coordinate={selectedPOI.coordinate} />
          ) : null}
        </Sheet.Frame>
      </Sheet>
    </View>
  );
}
