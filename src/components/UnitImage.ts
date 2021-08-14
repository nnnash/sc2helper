import battlecruiser from 'img/units/Battlecruiser.png'
import adept from 'img/units/Adept.png'
import archon from 'img/units/Archon.png'
import banshee from 'img/units/Banshee.png'
import broodlord from 'img/units/BroodLord.png'
import carrier from 'img/units/Carrier.png'
import colossus from 'img/units/Colossus.png'
import corruptor from 'img/units/Corruptor.png'
import cyclone from 'img/units/Cyclone.png'
import darktemplar from 'img/units/DarkTemplar.png'
import disruptor from 'img/units/Disruptor.png'
import ghost from 'img/units/Ghost.png'
import hellion from 'img/units/Hellion.png'
import hightemplar from 'img/units/HighTemplar.png'
import hydralisk from 'img/units/Hydralisk.png'
import immortal from 'img/units/Immortal.png'
import infestor from 'img/units/Infestor.png'
import liberator from 'img/units/Liberator.png'
import lurker from 'img/units/Lurker.png'
import marauder from 'img/units/Marauder.png'
import marine from 'img/units/Marine.png'
import mothership from 'img/units/Mothership.png'
import mutalisk from 'img/units/Mutalisk.png'
import oracle from 'img/units/Oracle.png'
import phoenix from 'img/units/Phoenix.png'
import queen from 'img/units/Queen.png'
import ravager from 'img/units/Ravager.png'
import raven from 'img/units/Raven.png'
import reaper from 'img/units/Reaper.png'
import roach from 'img/units/Roach.png'
import sentry from 'img/units/Sentry.png'
import stalker from 'img/units/Stalker.png'
import swarmhost from 'img/units/SwarmHost.png'
import siegetank from 'img/units/SiegeTank.png'
import tempest from 'img/units/Tempest.png'
import thor from 'img/units/Thor.png'
import ultralisk from 'img/units/Ultralisk.png'
import baneling from 'img/units/Baneling.png'
import viking from 'img/units/Viking.png'
import viper from 'img/units/Viper.png'
import voidray from 'img/units/VoidRay.png'
import widowmine from 'img/units/WidowMine.png'
import zealot from 'img/units/Zealot.png'
import zergling from 'img/units/Zergling.png'
import {Unit} from '../types/models'

export const unitImgMap: {[key: string]: string} = {
  battlecruiser,
  adept,
  archon,
  baneling,
  banshee,
  broodlord,
  carrier,
  colossus,
  corruptor,
  cyclone,
  darktemplar,
  disruptor,
  ghost,
  hellion,
  hightemplar,
  hydralisk,
  immortal,
  infestor,
  liberator,
  lurker,
  marauder,
  marine,
  mothership,
  mutalisk,
  oracle,
  phoenix,
  queen,
  ravager,
  raven,
  reaper,
  roach,
  sentry,
  stalker,
  swarmhost,
  siegetank,
  tempest,
  thor,
  ultralisk,
  viking,
  viper,
  voidray,
  widowmine,
  zealot,
  zergling,
}

export const getUnitImage = (name: Unit['name']) => unitImgMap[name.split(' ').join('').toLowerCase()]
