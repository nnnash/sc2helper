import React from 'react'

import {Attribute, AttributeInfo, Bonus, UnitDescriptions, UnitType} from '../types/models'
import Heroic from '../img/superman.svg'
import Psi from '../img/psychology-symbol.svg'
import Armor from '../img/shield.svg'
import Mech from '../img/wrench.svg'
import Massive from '../img/bar.svg'
import Bio from '../img/dna.svg'
import Light from '../img/feather.svg'
import Ground from '../img/tank.svg'
import Air from '../img/jet.svg'
import Assist from '../img/add-button.svg'
import Melee from '../img/punch.svg'
import LinearSplash from '../img/bomb-explosion.svg'
import Splash from '../img/explosion.svg'
import Cloak from '../img/invisible.svg'
import Range from '../img/target.svg'
import Speed from '../img/speed.svg'
import GroundAttack from '../img/machine-gun.svg'
import AirAttack from '../img/rocket.svg'
import Support from '../img/two.svg'

export const ATTRIBUTES: {[K in Attribute]: AttributeInfo} = {
  [Attribute.heroic]: {
    id: Attribute.heroic,
    svg: <Heroic />,
    color: '#164b13',
    tooltip: 'Heroic unit',
  },
  [Attribute.psi]: {
    id: Attribute.psi,
    svg: <Psi />,
    color: '#33a8f1',
    tooltip: 'Psionic unit',
  },
  [Attribute.armor]: {
    id: Attribute.armor,
    svg: <Armor />,
    color: '#434443',
    tooltip: 'Armored unit',
  },
  [Attribute.mech]: {
    id: Attribute.mech,
    svg: <Mech />,
    color: '#ad6c3c',
    tooltip: 'Mechanical unit',
  },
  [Attribute.massive]: {
    id: Attribute.massive,
    svg: <Massive />,
    color: '#ad3437',
    tooltip: 'Massive unit',
  },
  [Attribute.bio]: {
    id: Attribute.bio,
    svg: <Bio />,
    color: '#2fa043',
    tooltip: 'Biological unit',
  },
  [Attribute.light]: {
    id: Attribute.light,
    svg: <Light />,
    color: '#2c2b2c',
    tooltip: 'Light unit',
  },
}

export const UNIT_TYPE: {[K in UnitType]: AttributeInfo} = {
  [UnitType.air]: {
    id: UnitType.air,
    svg: <Air />,
    color: '#2457b1',
    tooltip: 'Air unit',
  },
  [UnitType.ground]: {
    id: UnitType.ground,
    svg: <Ground />,
    color: '#52432f',
    tooltip: 'Ground unit',
  },
}

export const UNIT_DESCRIPTION: {[K in UnitDescriptions]: AttributeInfo} = {
  [UnitDescriptions.assist]: {
    id: UnitDescriptions.assist,
    svg: <Assist />,
    color: '#b3a541',
    tooltip: 'Assist unit',
  },
  [UnitDescriptions.melee]: {
    id: UnitDescriptions.melee,
    svg: <Melee />,
    color: '#5f562b',
    tooltip: 'Melee unit',
  },
}

export const BONUS: {[K in Bonus]: AttributeInfo} = {
  [Bonus.splash]: {
    id: Bonus.splash,
    svg: <Splash />,
    color: '#ff3648',
    tooltip: 'Splash ability',
  },
  [Bonus.linearSplash]: {
    id: Bonus.linearSplash,
    svg: <LinearSplash />,
    color: '#b52f49',
    tooltip: 'Linear splash ability',
  },
  [Bonus.cloak]: {
    id: Bonus.cloak,
    svg: <Cloak />,
    color: '#721251',
    tooltip: 'Cloak ability',
  },
  [Bonus.range]: {
    id: Bonus.range,
    svg: <Range />,
    color: '#643823',
    tooltip: 'Long range ability',
  },
  [Bonus.speed]: {
    id: Bonus.speed,
    svg: <Speed />,
    color: '#009446',
    tooltip: 'Speed ability',
  },
  [Bonus.support]: {
    id: Bonus.support,
    svg: <Support />,
    color: '#173b78',
    tooltip: '+2 support value',
  },
}

export const ATTACK_LIMIT: {[K in UnitType]: AttributeInfo} = {
  [UnitType.air]: {
    id: UnitType.air,
    svg: <AirAttack />,
    color: '#ff3648',
    tooltip: 'Can only attack air units',
  },
  [UnitType.ground]: {
    id: UnitType.ground,
    svg: <GroundAttack />,
    color: '#49213f',
    tooltip: 'Can only attack ground units',
  },
}
