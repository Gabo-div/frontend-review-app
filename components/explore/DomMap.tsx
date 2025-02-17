"use dom";

import { forwardRef, useEffect, useRef, useState } from "react";
import { Map, MapGeoJSONFeature, MapMouseEvent, Marker } from "maplibre-gl";
import { DOMImperativeFactory, useDOMImperativeHandle } from "expo/dom";
import { POI } from "@/models/POI";
import "maplibre-gl/dist/maplibre-gl.css";

interface Props {
  mapStyles: any;
  initialState: InitialState;
  styles?: Styles;
  onLoad?: () => void;
  onPoiClick?: (poi: POI) => void;
  onMove?: (state: MapState) => void;
}

interface InitialState {
  longitude: number;
  latitude: number;
  zoom: number;
}

interface Styles {
  water: string;
  background: string;
  landuse: string;
  landcover: string;
  text: string;
  line: string;
  userLocation: string;
}

export interface MapState {
  zoom: number;
  bearing: number;
  pitch: number;
  center: {
    latitude: number;
    longitude: number;
  };
}

type POIClickEvent = MapMouseEvent & {
  features?: MapGeoJSONFeature[];
};

interface MoveTo {
  latitude: number;
  longitude: number;
  zoom?: number;
}

export interface DomMapRef extends DOMImperativeFactory {
  // @ts-ignore
  moveTo: (state: MoveTo) => void;
  // @ts-ignore
  updateUserLocation: (location: {
    latitude: number;
    longitude: number;
  }) => void;
  resetBearing: () => void;
  resetPitch: () => void;
}

/* eslint-disable react/display-name */
export default forwardRef<
  DomMapRef,
  Props & { dom?: import("expo/dom").DOMProps }
>(function (
  { onLoad, onPoiClick, onMove, initialState, styles, mapStyles },
  ref,
) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [userLocationMarker] = useState(
    new Marker({
      color: styles?.userLocation,
    }),
  );

  useDOMImperativeHandle(
    ref,
    () => ({
      // @ts-ignore
      moveTo: (state) => {
        if (!map) return;

        map.flyTo({
          center: [state.longitude, state.latitude],
          zoom: state.zoom,
        });
      },
      // @ts-ignore
      updateUserLocation: (l) => {
        if (!map) return;

        userLocationMarker.setLngLat([l.longitude, l.latitude]).addTo(map);
      },
      resetBearing: () => {
        if (!map) return;

        map.setBearing(0);
      },
      resetPitch: () => {
        if (!map) return;

        map.setPitch(0);
      },
    }),
    [map, userLocationMarker],
  );

  useEffect(() => {
    if (!mapRef.current || map) return;

    setMap(
      new Map({
        container: mapRef.current,
        style: mapStyles,
        center: [initialState.longitude, initialState.latitude],
        zoom: initialState.zoom,
        attributionControl: false,
      }),
    );
  }, [map, mapRef, initialState, mapStyles]);

  useEffect(() => {
    if (!map || isLoading || !styles) return;

    map.setLayoutProperty("poi-level-3", "icon-size", 1);
    map.setLayoutProperty("poi-level-3", "text-size", 14);
    map.setLayoutProperty("poi-level-3", "icon-anchor", "bottom");
    map.setLayoutProperty("poi-level-3", "text-anchor", "top");

    map.setLayoutProperty("poi-level-2", "icon-size", 1);
    map.setLayoutProperty("poi-level-2", "text-size", 14);
    map.setLayoutProperty("poi-level-2", "icon-anchor", "bottom");
    map.setLayoutProperty("poi-level-2", "text-anchor", "top");

    map.setLayoutProperty("poi-level-1", "icon-size", 1);
    map.setLayoutProperty("poi-level-1", "text-size", 14);
    map.setLayoutProperty("poi-level-1", "icon-anchor", "bottom");
    map.setLayoutProperty("poi-level-1", "text-anchor", "top");

    // fill layers
    map.setPaintProperty("background", "background-color", styles.background);
    map.setPaintProperty("building", "fill-color", styles.landuse);
    map.setPaintProperty("building", "fill-outline-color", styles.landuse);
    map.setPaintProperty("building-top", "fill-color", styles.landuse);
    map.setPaintProperty("building-top", "fill-outline-color", styles.landuse);
    map.setPaintProperty("park", "fill-color", styles.landcover);
    map.setPaintProperty("aeroway-area", "fill-color", styles.landcover);
    map.setPaintProperty("highway-area", "fill-color", styles.landcover);
    map.setPaintProperty("landuse-residential", "fill-color", styles.landuse);
    map.setPaintProperty("landuse-commercial", "fill-color", styles.landuse);
    map.setPaintProperty("landuse-industrial", "fill-color", styles.landuse);
    map.setPaintProperty("landuse-cemetery", "fill-color", styles.landuse);
    map.setPaintProperty("landuse-hospital", "fill-color", styles.landuse);
    map.setPaintProperty("landuse-school", "fill-color", styles.landuse);
    map.setPaintProperty("landuse-railway", "fill-color", styles.landuse);
    map.setPaintProperty("landcover-glacier", "fill-color", styles.landcover);
    map.setPaintProperty("landcover-wood", "fill-color", styles.landcover);
    map.setPaintProperty("landcover-grass", "fill-color", styles.landcover);
    map.setPaintProperty(
      "landcover-grass-park",
      "fill-color",
      styles.landcover,
    );
    map.setPaintProperty("landcover-ice-shelf", "fill-color", styles.landcover);
    map.setPaintProperty("water", "fill-color", styles.water);
    map.setPaintProperty("water-offset", "fill-color", styles.water);
    map.setPaintProperty("water-pattern", "fill-color", styles.water);

    // text layers
    [
      "waterway-name",
      "water-name-lakeline",
      "water-name-ocean",
      "water-name-other",
      "poi-level-3",
      "poi-level-2",
      "poi-level-1",
      "poi-railway",
      "road_oneway",
      "road_oneway_opposite",
      "highway-name-path",
      "highway-name-minor",
      "highway-name-major",
      "highway-shield",
      "highway-shield-us-interstate",
      "highway-shield-us-other",
      "airport-label-major",
      "place-other",
      "place-village",
      "place-town",
      "place-city",
      "place-city-capital",
      "place-country-other",
      "place-country-3",
      "place-country-2",
      "place-country-1",
      "place-continent",
    ].forEach((l) => {
      map.setPaintProperty(l, "text-color", styles.text);
      map.setPaintProperty(l, "text-halo-color", undefined);
    });

    // line layers
    map.setPaintProperty("park-outline", "line-color", styles.line);
    map.setPaintProperty("waterway_tunnel", "line-color", styles.line);
    map.setPaintProperty("waterway-other", "line-color", styles.line);
    map.setPaintProperty("waterway-stream-canal", "line-color", styles.line);
    map.setPaintProperty("waterway-river", "line-color", styles.line);
    map.setPaintProperty(
      "tunnel-service-track-casing",
      "line-color",
      styles.line,
    );
    map.setPaintProperty("tunnel-minor-casing", "line-color", styles.line);
    map.setPaintProperty(
      "tunnel-secondary-tertiary-casing",
      "line-color",
      styles.line,
    );
    map.setPaintProperty(
      "tunnel-trunk-primary-casing",
      "line-color",
      styles.line,
    );
    map.setPaintProperty("tunnel-motorway-casing", "line-color", styles.line);
    map.setPaintProperty("tunnel-path", "line-color", styles.line);
    map.setPaintProperty("tunnel-service-track", "line-color", styles.line);
    map.setPaintProperty("tunnel-minor", "line-color", styles.line);
    map.setPaintProperty(
      "tunnel-secondary-tertiary",
      "line-color",
      styles.line,
    );
    map.setPaintProperty("tunnel-trunk-primary", "line-color", styles.line);
    map.setPaintProperty("tunnel-motorway", "line-color", styles.line);
    map.setPaintProperty("tunnel-railway", "line-color", styles.line);
    map.setPaintProperty("ferry", "line-color", styles.line);
    map.setPaintProperty("aeroway-taxiway-casing", "line-color", styles.line);
    map.setPaintProperty("aeroway-runway-casing", "line-color", styles.line);
    map.setPaintProperty("aeroway-taxiway", "line-color", styles.line);
    map.setPaintProperty("aeroway-runway", "line-color", styles.line);
    map.setPaintProperty(
      "highway-motorway-link-casing",
      "line-color",
      styles.line,
    );
    map.setPaintProperty("highway-link-casing", "line-color", styles.line);
    map.setPaintProperty("highway-minor-casing", "line-color", styles.line);
    map.setPaintProperty(
      "highway-secondary-tertiary-casing",
      "line-color",
      styles.line,
    );
    map.setPaintProperty("highway-primary-casing", "line-color", styles.line);
    map.setPaintProperty("highway-trunk-casing", "line-color", styles.line);
    map.setPaintProperty("highway-motorway-casing", "line-color", styles.line);
    map.setPaintProperty("highway-path", "line-color", styles.line);
    map.setPaintProperty("highway-motorway-link", "line-color", styles.line);
    map.setPaintProperty("highway-link", "line-color", styles.line);
    map.setPaintProperty("highway-minor", "line-color", styles.line);
    map.setPaintProperty(
      "highway-secondary-tertiary",
      "line-color",
      styles.line,
    );
    map.setPaintProperty("highway-primary", "line-color", styles.line);
    map.setPaintProperty("highway-trunk", "line-color", styles.line);
    map.setPaintProperty("highway-motorway", "line-color", styles.line);
    map.setPaintProperty("railway-transit", "line-color", styles.line);
    map.setPaintProperty("railway-transit-hatching", "line-color", styles.line);
    map.setPaintProperty("railway-service", "line-color", styles.line);
    map.setPaintProperty("railway-service-hatching", "line-color", styles.line);
    map.setPaintProperty("railway", "line-color", styles.line);
    map.setPaintProperty("railway-hatching", "line-color", styles.line);
    map.setPaintProperty(
      "bridge-motorway-link-casing",
      "line-color",
      styles.line,
    );
    map.setPaintProperty("bridge-link-casing", "line-color", styles.line);
    map.setPaintProperty(
      "bridge-secondary-tertiary-casing",
      "line-color",
      styles.line,
    );
    map.setPaintProperty(
      "bridge-trunk-primary-casing",
      "line-color",
      styles.line,
    );
    map.setPaintProperty("bridge-motorway-casing", "line-color", styles.line);
    map.setPaintProperty("bridge-path-casing", "line-color", styles.line);
    map.setPaintProperty("bridge-path", "line-color", styles.line);
    map.setPaintProperty("bridge-motorway-link", "line-color", styles.line);
    map.setPaintProperty("bridge-link", "line-color", styles.line);
    map.setPaintProperty(
      "bridge-secondary-tertiary",
      "line-color",
      styles.line,
    );
    map.setPaintProperty("bridge-trunk-primary", "line-color", styles.line);
    map.setPaintProperty("bridge-motorway", "line-color", styles.line);
    map.setPaintProperty("bridge-railway", "line-color", styles.line);
    map.setPaintProperty("bridge-railway-hatching", "line-color", styles.line);
    map.setPaintProperty("cablecar", "line-color", styles.line);
    map.setPaintProperty("cablecar-dash", "line-color", styles.line);
    map.setPaintProperty("boundary-land-level-4", "line-color", styles.line);
    map.setPaintProperty("boundary-land-level-2", "line-color", styles.line);
    map.setPaintProperty("boundary-land-disputed", "line-color", styles.line);
    map.setPaintProperty("boundary-water", "line-color", styles.line);
  }, [map, styles, isLoading]);

  useEffect(() => {
    if (!map) return;

    const handleOnLoad = () => {
      setIsLoading(false);

      if (onLoad) {
        onLoad();
      }
    };

    const handleOnClick = (e: POIClickEvent) => {
      if (!onPoiClick || !e.features) {
        return;
      }

      const { features } = e;

      if (!features[0].id || !features[0].properties.name) return;

      onPoiClick({
        name: features[0].properties.name,
        placeId: features[0].id.toString(),
        coordinate: {
          latitude: e.lngLat.lat,
          longitude: e.lngLat.lng,
        },
      });
    };

    const handleOnMove = () => {
      if (!onMove) {
        return;
      }
      onMove({
        zoom: map.getZoom(),
        bearing: map.getBearing(),
        pitch: map.getPitch(),
        center: {
          latitude: map.getCenter().lat,
          longitude: map.getCenter().lng,
        },
      });
    };

    const disableTab = (e: KeyboardEvent) => {
      if (e.key === "Tab") e.preventDefault();
    };

    map.on("load", handleOnLoad);
    map.on("move", handleOnMove);
    map.on("click", "poi-level-1", handleOnClick);
    map.on("click", "poi-level-2", handleOnClick);
    map.on("click", "poi-level-3", handleOnClick);
    window.addEventListener("keydown", disableTab);

    return () => {
      map.off("load", handleOnLoad);
      map.off("move", handleOnMove);
      map.off("click", "poi-level-1", handleOnClick);
      map.off("click", "poi-level-2", handleOnClick);
      map.off("click", "poi-level-3", handleOnClick);
      window.removeEventListener("keydown", disableTab);
    };
  }, [map, onLoad, onPoiClick, onMove]);

  return (
    <div
      ref={mapRef}
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
      }}
    />
  );
});
