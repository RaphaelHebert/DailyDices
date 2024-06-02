import { configureAxios } from './helpers'
import { IScore, DiceRoll } from '@/type'
import { v4 as uuidv4 } from 'uuid'

export async function fetchDiceRolls(n: number): Promise<{
  data: IScore
}> {
  const axiosInstance = configureAxios()
  return axiosInstance.get(`/roll-dices?n=${n}`)
}

export const fetchDiceRollsMock = async (
  n: number
): Promise<{
  data: IScore
}> => {
  // Generate random dice rolls
  const res: DiceRoll = []
  for (let i = 0; i < n; i++) {
    res.push(Math.floor(Math.random() * 6) + 1)
  }

  return new Promise((resolve) =>
    resolve({ data: { score: res, id: uuidv4(), date: Date.now() } })
  )
}
