import React from 'react'

export enum AttDefValue {
  attack = 'attack',
  defend = 'defend',
}

export const AttackDefendContext = React.createContext<AttDefValue>(AttDefValue.attack)
AttackDefendContext.displayName = 'AttackDefendContext'

interface AttDefProviderProps {
  attDef: AttDefValue
}
export const AttDefProvider: React.FC<AttDefProviderProps & {children: React.ReactNode}> = ({attDef, children}) => {
  return <AttackDefendContext.Provider value={attDef}>{children}</AttackDefendContext.Provider>
}

export const useAttDef = () => {
  const context = React.useContext(AttackDefendContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AttDefProvider`)
  }
  return context
}
