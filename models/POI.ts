export interface POI {
  name: string;
  placeId: string;

  coordinate: {
    latitude: number;
    longitude: number;
  };
  position?: {
    x: number;
    y: number;
  };
}
