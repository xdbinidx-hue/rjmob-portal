// RJ-Mob laskentasäännöt
export const LAPIMENO = 0.65
export const NORMAL_MULT = 5.0
export const KRENAR_SELLER_MULT = 4.0
export const KRENAR_RJMOB_MULT = 1.0
export const SIVU_KERROIN = 1.25
export const FSEC_RECURRING = 1.5
export const PAYOUT_DELAY_MONTHS = 3

// F-Secure provisiot
export const FSEC_TOTAL_SELLER = 7
export const FSEC_INTERNET_SELLER = 3.5
export const FSEC_TOTAL_RJMOB = 10
export const FSEC_INTERNET_RJMOB = 5

// F-Secure bonusportaat
export function fsecBonus(kpl: number): number {
  if (kpl >= 80) return 1000
  if (kpl >= 45) return 450
  if (kpl >= 25) return 250
  if (kpl >= 15) return 100
  return 0
}

export const TUNTIPALKAT: Record<string, number> = {
  'Basri Salihi': 15,
  'Salihi Basri': 15,
  'Vladimir Kogan': 10,
  'Kogan Vladimir': 10,
  default: 13,
}

export const REF_SELLERS: string[] = []
export const OWNER_SELLERS = ['Arbnor Rashica', 'Rashica Arbnor', 'Albin Rashica', 'Rashica Albin']
export const KRENAR_SELLERS = ['Krenar Bajqinovci', 'Bajqinovci Krenar']
export const STANDI_SELLERS = ['Jussi Kanerva', 'Kanerva Jussi', 'Esa Peltola', 'Peltola Esa']
export const SKIP_ROWS = ['yhteensä', 'total', 'yht.']

export const RJ_MOB_SELLERS = [
  'Hamza Hanif', 'Hanif Hamza',
  'Basri Salihi', 'Salihi Basri',
  'Arbnor Rashica', 'Rashica Arbnor',
  'Albin Rashica', 'Rashica Albin',
  'Alec Fambro', 'Fambro Alec',
  'Jami Tonteri', 'Tonteri Jami',
  'Joona Huttunen', 'Huttunen Joona',
  'Krenar Bajqinovci', 'Bajqinovci Krenar',
  'Atte Kröger', 'Kröger Atte',
  'Joni Viljamaa', 'Viljamaa Joni',
  'Kasperi Kemppainen', 'Kemppainen Kasperi',
  'Lauri Ukkonen', 'Ukkonen Lauri',
  'Leo Rossi', 'Rossi Leo',
  'Vladimir Kogan', 'Kogan Vladimir',
  'Steven Sainio', 'Sainio Steven',
]

export function isRJMobSeller(nimi: string): boolean {
  return RJ_MOB_SELLERS.some(r => r.toLowerCase() === nimi.toLowerCase())
}
export function getTuntipalkka(nimi: string): number {
  return TUNTIPALKAT[nimi] ?? TUNTIPALKAT.default
}
export function isRefSeller(nimi: string): boolean {
  return REF_SELLERS.some(r => r.toLowerCase() === nimi.toLowerCase())
}
export function isOwner(nimi: string): boolean {
  return OWNER_SELLERS.some(r => r.toLowerCase() === nimi.toLowerCase())
}
export function isKrenar(nimi: string): boolean {
  return KRENAR_SELLERS.some(r => r.toLowerCase() === nimi.toLowerCase())
}
export function isStandi(nimi: string): boolean {
  return STANDI_SELLERS.some(r => r.toLowerCase() === nimi.toLowerCase())
}
export function shouldSkip(nimi: string): boolean {
  return SKIP_ROWS.some(s => nimi.toLowerCase().includes(s))
}

const MONTH_NAME_ORDER: Record<string, number> = {
  tammikuu: 1, tammi: 1,
  helmikuu: 2, helmi: 2,
  maaliskuu: 3, maalis: 3,
  huhtikuu: 4, huhti: 4,
  toukokuu: 5, touko: 5,
  kesäkuu: 6, kesä: 6, kesa: 6,
  heinäkuu: 7, heinä: 7, heina: 7,
  elokuu: 8, elo: 8,
  syyskuu: 9, syys: 9,
  lokakuu: 10, loka: 10,
  marraskuu: 11, marras: 11,
  joulukuu: 12, joulu: 12,
}

export function parseSheetDate(name: string): { year: number; month: number } {
  const yearMatch = name.match(/(20\d{2})/)
  const year = yearMatch ? Number(yearMatch[1]) : new Date().getFullYear()
  const normalized = name
    .toLowerCase()
    .replace('myyntiseuranta', '')
    .replace(/20\d{2}/g, ' ')
    .replace(/[^a-zäö0-9 ]/g, ' ')
    .trim()

  const tokens = normalized.split(/\s+/).filter(Boolean)
  const monthToken = tokens.find(token => Object.prototype.hasOwnProperty.call(MONTH_NAME_ORDER, token)) ?? ''
  const monthFromName = MONTH_NAME_ORDER[monthToken] ?? 0

  const prefixMatch = normalized.match(/^\s*(\d{1,2})/) 
  const monthFromPrefix = prefixMatch ? Number(prefixMatch[1]) : 0

  const monthFromNumber = tokens
    .map(token => Number(token))
    .find(num => Number.isInteger(num) && num >= 1 && num <= 12) ?? 0

  return {
    year,
    month: monthFromPrefix || monthFromName || monthFromNumber || 0,
  }
}

export function sortSheetFilesByDateDesc<T extends { name: string }>(files: T[]) {
  return [...files].sort((a, b) => {
    const aa = parseSheetDate(a.name)
    const bb = parseSheetDate(b.name)
    if (bb.year !== aa.year) return bb.year - aa.year
    return bb.month - aa.month
  })
}

export function sortSheetFilesByDateAsc<T extends { name: string }>(files: T[]) {
  return [...files].sort((a, b) => {
    const aa = parseSheetDate(a.name)
    const bb = parseSheetDate(b.name)
    if (aa.year !== bb.year) return aa.year - bb.year
    return aa.month - bb.month
  })
}

export interface SellerRaw {
  nimi: string
  liittKpl: number
  liittEur: number
  fsecKpl: number
  fsecTotalKpl: number
  fsecInternetKpl: number
  fsecEur: number
  kassa: number
  tunnit: number
}

export interface SellerResult {
  nimi: string
  tyyppi: 'normal' | 'owner' | 'krenar' | 'ref' | 'standi'
  liittKpl: number
  liittEur: number
  fsecKpl: number
  fsecTotalKpl: number
  fsecInternetKpl: number
  fsecEur: number
  fsecBonus: number
  kassa: number
  tunnit: number
  rjmobLiitt: number
  rjmobKassa: number
  rjmobFsec: number
  rjmobTulo: number
  myyjaProv: number
  tyokulu: number
  netto: number
  roi: number | null
  teho: number
  tehoStatus: 'green' | 'amber' | 'red' | 'special'
  fsecFV: number
}

export function laskeMyyja(raw: SellerRaw): SellerResult {
  const { nimi, liittEur, liittKpl, fsecKpl, fsecTotalKpl, fsecInternetKpl, fsecEur, kassa, tunnit } = raw

  const tyyppi = isOwner(nimi) ? 'owner'
    : isKrenar(nimi) ? 'krenar'
    : isRefSeller(nimi) ? 'ref'
    : isStandi(nimi) ? 'standi'
    : 'normal'

  const bonus = fsecBonus(fsecKpl)
  const rjmobFsec = (fsecTotalKpl * FSEC_TOTAL_RJMOB) + (fsecInternetKpl * FSEC_INTERNET_RJMOB) + bonus

  if (tyyppi === 'ref' || tyyppi === 'standi') {
    return {
      nimi, tyyppi, liittKpl, liittEur, fsecKpl, fsecTotalKpl, fsecInternetKpl,
      fsecEur, fsecBonus: bonus, kassa, tunnit,
      rjmobLiitt: 0, rjmobKassa: 0, rjmobFsec: 0, rjmobTulo: 0,
      myyjaProv: 0, tyokulu: 0, netto: 0, roi: null,
      teho: 0, tehoStatus: 'special', fsecFV: fsecKpl * FSEC_RECURRING * 12,
    }
  }

  let rjmobLiitt: number
  let myyjaProv: number

  if (tyyppi === 'krenar') {
    rjmobLiitt = liittEur * NORMAL_MULT
    myyjaProv = liittEur * KRENAR_SELLER_MULT
  } else {
    rjmobLiitt = liittEur * LAPIMENO * NORMAL_MULT
    myyjaProv = liittEur * LAPIMENO
  }

  const rjmobKassa = kassa * 5.0
  const rjmobTulo = rjmobLiitt + rjmobKassa + rjmobFsec
  const teho = tunnit > 0 ? (myyjaProv + kassa) / tunnit : 0
  const fsecFV = fsecKpl * FSEC_RECURRING * 12

  let tyokulu = 0
  let netto = 0
  let roi: number | null = null

  if (tyyppi === 'owner') {
    tyokulu = 0
    netto = rjmobTulo
    roi = null
  } else if (tyyppi === 'krenar') {
    tyokulu = myyjaProv + kassa + fsecEur + bonus
    netto = rjmobTulo - tyokulu
    roi = tyokulu > 0 ? (netto / tyokulu) * 100 : 0
  } else {
    const tp = getTuntipalkka(nimi)
    const pohja = tunnit * tp
    const prov = myyjaProv + kassa + fsecEur + bonus
    tyokulu = (pohja + prov) * SIVU_KERROIN
    netto = rjmobTulo - tyokulu
    roi = tyokulu > 0 ? (netto / tyokulu) * 100 : 0
  }

  const tehoStatus = tyyppi === 'owner' || tyyppi === 'krenar' ? 'special'
    : teho >= 9 ? 'green'
    : teho >= 7 ? 'amber'
    : 'red'

  return {
    nimi, tyyppi, liittKpl, liittEur, fsecKpl, fsecTotalKpl, fsecInternetKpl,
    fsecEur, fsecBonus: bonus, kassa, tunnit,
    rjmobLiitt, rjmobKassa, rjmobFsec, rjmobTulo,
    myyjaProv, tyokulu, netto, roi,
    teho, tehoStatus, fsecFV,
  }
}

export function fmt(n: number, decimals = 0): string {
  return n.toLocaleString('fi-FI', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}
