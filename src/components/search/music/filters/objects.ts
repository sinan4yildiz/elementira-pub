import {
   MusicFilterType,
   MusicSearchParamGenreType,
   MusicSearchParamInstrumentType,
   MusicSearchParamMoodType,
   MusicSearchParamTempoType,
   MusicSearchParamVocalType,
   VideoSearchParamLoopableType
} from '@lib/music/types'
import { trans } from '@lib/utils'

export const musicDurationFilter = {
   name: 'duration',
   label: trans('filters.duration.label')
}

export const musicGenreFilter: MusicFilterType<MusicSearchParamGenreType> = {
   name: 'genre',
   label: trans('filters.genre.label'),
   options: [
      {
         value: 'blues',
         label: trans('filters.genre.blues')
      },
      {
         value: 'chillOut',
         label: trans('filters.genre.chillOut')
      },
      {
         value: 'choirGroup',
         label: trans('filters.genre.choirGroup')
      },
      {
         value: 'classical',
         label: trans('filters.genre.classical')
      },
      {
         value: 'corporate',
         label: trans('filters.genre.corporate')
      },
      {
         value: 'country',
         label: trans('filters.genre.country')
      },
      {
         value: 'dance',
         label: trans('filters.genre.dance')
      },
      {
         value: 'electronic',
         label: trans('filters.genre.electronic')
      },
      {
         value: 'house',
         label: trans('filters.genre.house')
      },
      {
         value: 'african',
         label: trans('filters.genre.african')
      },
      {
         value: 'caribbeanIsland',
         label: trans('filters.genre.caribbeanIsland')
      },
      {
         value: 'celtic',
         label: trans('filters.genre.celtic')
      },
      {
         value: 'childrenKids',
         label: trans('filters.genre.childrenKids')
      },
      {
         value: 'cinematic',
         label: trans('filters.genre.cinematic')
      },
      {
         value: 'dubstep',
         label: trans('filters.genre.dubstep')
      },
      {
         value: 'eastern',
         label: trans('filters.genre.eastern')
      },
      {
         value: 'european',
         label: trans('filters.genre.european')
      },
      {
         value: 'folk',
         label: trans('filters.genre.folk')
      },
      {
         value: 'funk',
         label: trans('filters.genre.funk')
      },
      {
         value: 'hipHopRap',
         label: trans('filters.genre.hipHopRap')
      },
      {
         value: 'indian',
         label: trans('filters.genre.indian')
      },
      {
         value: 'middleEast',
         label: trans('filters.genre.middleEast')
      },
      {
         value: 'jazz',
         label: trans('filters.genre.jazz')
      },
      {
         value: 'latin',
         label: trans('filters.genre.latin')
      },
      {
         value: 'lounge',
         label: trans('filters.genre.lounge')
      },
      {
         value: 'metal',
         label: trans('filters.genre.metal')
      },
      {
         value: 'pop',
         label: trans('filters.genre.pop')
      },
      {
         value: 'rock',
         label: trans('filters.genre.rock')
      },
      {
         value: 'techno',
         label: trans('filters.genre.techno')
      },
      {
         value: 'rb',
         label: trans('filters.genre.rb')
      },
      {
         value: 'trap',
         label: trans('filters.genre.trap')
      },
      {
         value: 'tropical',
         label: trans('filters.genre.tropical')
      }
   ]
}

export const musicInstrumentFilter: MusicFilterType<MusicSearchParamInstrumentType> = {
   name: 'instrument',
   label: trans('filters.instrument.label'),
   options: [
      {
         value: 'accordion',
         label: trans('filters.instrument.accordion')
      },
      {
         value: 'acousticGuitar',
         label: trans('filters.instrument.acousticGuitar')
      },
      {
         value: 'banjo',
         label: trans('filters.instrument.banjo')
      },
      {
         value: 'bass',
         label: trans('filters.instrument.bass')
      },
      {
         value: 'bells',
         label: trans('filters.instrument.bells')
      },
      {
         value: 'brass',
         label: trans('filters.instrument.brass')
      },
      {
         value: 'cello',
         label: trans('filters.instrument.cello')
      },
      {
         value: 'drums',
         label: trans('filters.instrument.drums')
      },
      {
         value: 'electricGuitar',
         label: trans('filters.instrument.electricGuitar')
      },
      {
         value: 'electricDrums',
         label: trans('filters.instrument.electricDrums')
      },
      {
         value: 'synthesizer',
         label: trans('filters.instrument.synthesizer')
      },
      {
         value: 'flute',
         label: trans('filters.instrument.flute')
      },
      {
         value: 'harmonica',
         label: trans('filters.instrument.harmonica')
      },
      {
         value: 'harp',
         label: trans('filters.instrument.harp')
      },
      {
         value: 'horns',
         label: trans('filters.instrument.horns')
      },
      {
         value: 'orchestra',
         label: trans('filters.instrument.orchestra')
      },
      {
         value: 'percussion',
         label: trans('filters.instrument.percussion')
      },
      {
         value: 'piano',
         label: trans('filters.instrument.piano')
      },
      {
         value: 'saxophone',
         label: trans('filters.instrument.saxophone')
      },
      {
         value: 'handClaps',
         label: trans('filters.instrument.handClaps')
      },
      {
         value: 'strings',
         label: trans('filters.instrument.strings')
      },
      {
         value: 'synth',
         label: trans('filters.instrument.synth')
      },
      {
         value: 'trumpet',
         label: trans('filters.instrument.trumpet')
      },
      {
         value: 'violin',
         label: trans('filters.instrument.violin')
      },
      {
         value: 'whistling',
         label: trans('filters.instrument.whistling')
      },
      {
         value: 'woodwinds',
         label: trans('filters.instrument.woodwinds')
      }
   ]
}

export const musicLoopableFilter: MusicFilterType<VideoSearchParamLoopableType> = {
   name: 'loopable',
   label: trans('filters.loopable.label'),
   options: [
      {
         value: 'true',
         label: trans('filters.loopable.true')
      },
      {
         value: 'false',
         label: trans('filters.loopable.false')
      }
   ]
}

export const musicMoodFilter: MusicFilterType<MusicSearchParamMoodType> = {
   name: 'mood',
   label: trans('filters.mood.label'),
   options: [
      {
         value: 'angryAggressive',
         label: trans('filters.mood.angryAggressive')
      },
      {
         value: 'chillMellow',
         label: trans('filters.mood.chillMellow')
      },
      {
         value: 'darkSuspenseful',
         label: trans('filters.mood.darkSuspenseful')
      },
      {
         value: 'dramaticEmotional',
         label: trans('filters.mood.dramaticEmotional')
      },
      {
         value: 'epicPowerful',
         label: trans('filters.mood.epicPowerful')
      },
      {
         value: 'funnyQuirky',
         label: trans('filters.mood.funnyQuirky')
      },
      {
         value: 'happyCheerful',
         label: trans('filters.mood.happyCheerful')
      },
      {
         value: 'inspiringUplifting',
         label: trans('filters.mood.inspiringUplifting')
      },
      {
         value: 'relaxingMeditation',
         label: trans('filters.mood.relaxingMeditation')
      },
      {
         value: 'romanticSentimental',
         label: trans('filters.mood.romanticSentimental')
      },
      {
         value: 'sadSomber',
         label: trans('filters.mood.sadSomber')
      },
      {
         value: 'upbeatEnergetic',
         label: trans('filters.mood.upbeatEnergetic')
      },
      {
         value: 'sexy',
         label: trans('filters.mood.sexy')
      },
      {
         value: 'tender',
         label: trans('filters.mood.tender')
      },
      {
         value: 'sophisticated',
         label: trans('filters.mood.sophisticated')
      },
      {
         value: 'bright',
         label: trans('filters.mood.bright')
      }
   ]
}

export const musicTempoFilter: MusicFilterType<MusicSearchParamTempoType> = {
   name: 'tempo',
   label: trans('filters.tempo.label'),
   options: [
      {
         value: 'verySlow',
         label: trans('filters.tempo.verySlow.label')
      },
      {
         value: 'slow',
         label: trans('filters.tempo.slow.label')
      },
      {
         value: 'medium',
         label: trans('filters.tempo.medium.label')
      },
      {
         value: 'upbeat',
         label: trans('filters.tempo.upbeat.label')
      },
      {
         value: 'fast',
         label: trans('filters.tempo.fast.label')
      },
      {
         value: 'veryFast',
         label: trans('filters.tempo.veryFast.label')
      }
   ]
}

export const musicVocalFilter: MusicFilterType<MusicSearchParamVocalType> = {
   name: 'vocal',
   label: trans('filters.vocal.label'),
   options: [
      {
         value: 'background',
         label: trans('filters.vocal.background')
      },
      {
         value: 'male',
         label: trans('filters.vocal.male')
      },
      {
         value: 'female',
         label: trans('filters.vocal.female')
      },
      {
         value: 'noVocal',
         label: trans('filters.vocal.noVocal')
      }
   ]
}
