import { createTamagui } from "@tamagui/core";
import { config } from "@tamagui/config/v3";

const tamaguiConfig = createTamagui(config);

export default tamaguiConfig;

type Conf = typeof tamaguiConfig;

declare module "@tamagui/core" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends Conf {}
}
