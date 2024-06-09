import { createTamagui } from 'tamagui' // or 'tamagui'
import { config } from '@tamagui/config/v2-native'

// you usually export this from a tamagui.config.ts file
const tamaguiConfig = createTamagui(config)

// make TypeScript type everything based on your config
type Conf = typeof tamaguiConfig

declare module 'tamagui' { 
  interface TamaguiCustomConfig extends Conf {}
}

export default tamaguiConfig