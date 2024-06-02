export type DiceRoll = number[]

export interface IScore {
  score: DiceRoll
  date: number
  id: string // UID of the score, to be replaced by date
}

export type IScores = IScore[]
