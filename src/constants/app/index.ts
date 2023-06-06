import {
   graphicAsset,
   imageAsset,
   musicAsset,
   soundEffectAsset,
   templateAsset,
   videoAsset
} from '@constants/app/assets'

import { AppProvidersType, AppType } from '@constants/app/types'
import { graphicProviders } from '@lib/graphics'
import { imageProviders } from '@lib/images'
import { musicProviders } from '@lib/music'
import { soundEffectProviders } from '@lib/soundEffects'
import { templateProviders } from '@lib/templates'
import { videoProviders } from '@lib/video'

const app: AppType = {
   assets: {
      images: imageAsset,
      video: videoAsset,
      music: musicAsset,
      soundEffects: soundEffectAsset,
      graphics: graphicAsset,
      templates: templateAsset
   },
   providers: {
      images: imageProviders,
      video: videoProviders,
      music: musicProviders,
      soundEffects: soundEffectProviders,
      graphics: graphicProviders,
      templates: templateProviders
   }
}

// Filter providers by status
for (const assetType in app.providers) {
   for (const provider in app.providers[assetType as keyof AppProvidersType]) {
      // @ts-ignore
      if (!app.providers[assetType as keyof AppProvidersType][provider].active)
         delete app.providers[assetType as keyof AppProvidersType][provider as never]
   }
}

export default app
