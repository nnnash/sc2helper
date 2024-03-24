import React, {createContext, FC} from 'react'

import {Race} from 'types/models'
import {FactionColor, raceByColor} from './models'

const RaceContext = createContext<{race: Race; color: FactionColor}>({race: Race.zerg, color: FactionColor.green})
RaceContext.displayName = 'RaceContext'

export const RaceContextProvider: FC<{color: FactionColor; children: React.ReactNode}> = ({color, children}) => {
  const race = raceByColor[color]
  return <RaceContext.Provider value={{race, color}}>{children}</RaceContext.Provider>
}

export const useRaceProvider = () => {
  const context = React.useContext(RaceContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a RaceContext`)
  }
  return context
}
