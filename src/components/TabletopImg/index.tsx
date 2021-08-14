import React, {FC} from 'react'

import Faction from './Faction'
import {FactionColor} from './models'
import Collapse from './Collapse'
import Buildings from './Buildings'
import {Race} from '../../types/models'
import Tips2 from './Tips2'

const FilledWithColors: FC<{Comp: FC<{color: FactionColor}>}> = ({Comp}) => (
  <>
    {Object.values(FactionColor).map((color) => (
      <Comp key={`${Comp.displayName}-${color}`} color={color} />
    ))}
  </>
)
const FilledWithRace: FC<{Comp: FC<{race?: Race}>}> = ({Comp}) => (
  <>
    {Object.values(Race).map((race) => (
      <Comp key={`${Comp.displayName}-${race}`} race={race} />
    ))}
  </>
)

const TabletopImg = () => (
  <>
    <Collapse name="Factions">
      <FilledWithColors Comp={Faction} />
    </Collapse>
    <Collapse name="Buildings">
      <FilledWithColors Comp={Buildings} />
    </Collapse>
    <Collapse name="Tips 2">
      <FilledWithRace Comp={Tips2} />
    </Collapse>
  </>
)

export default TabletopImg
