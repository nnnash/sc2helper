import {Race} from '../types/models'
import zergLogo from '../components/TabletopImg/img/zergLogo.png'
import protossLogo from '../components/TabletopImg/img/protossLogo.png'
import terranLogo from '../components/TabletopImg/img/terranLogo.png'

export const RACE_ABBR: Record<string, Race> = {
  t: Race.terran,
  p: Race.protoss,
  z: Race.zerg,
}

export const logoMap = {
  [Race.zerg]: zergLogo,
  [Race.protoss]: protossLogo,
  [Race.terran]: terranLogo,
}
