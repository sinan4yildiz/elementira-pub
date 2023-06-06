import { CreativeMarket, ShutterStock } from '@lib/templates/providers'
import { TemplateProvidersType } from '@lib/templates/types'
import templateAutocomplete from './autocomplete'
import EnvatoTemplates from './providers/EnvatoTemplates'
import templateRelatedKeywords from './relatedKeywords'

const templateProviders: TemplateProvidersType = {
   ShutterStock: ShutterStock,
   CreativeMarket: CreativeMarket,
   EnvatoTemplates: EnvatoTemplates
}

export { templateProviders, templateAutocomplete, templateRelatedKeywords }
