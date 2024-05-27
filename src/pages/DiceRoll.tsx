import React from 'react'
import { Button, Stack, Alert } from '@mui/material'
import { signal } from '@preact/signals-react'
import { useQuery } from 'react-query'
import { fetchDiceRollsMock, fetchDiceRolls } from '@/api/dice'

import { DiceRoll as DiceRollType } from '@/type'
import { Dice, Scores } from '@/components'
import { diceScores, authToken } from '@/signals'

const roll = signal<DiceRollType>([])

const rolling = signal(false)
const easeIn = signal(true)

const DiceRoll: React.FC = () => {
  const numberOfDices = 6

  const {
    data: score,
    isFetching,
    isError,
    isSuccess,
    refetch,
    error,
  } = useQuery({
    queryKey: 'diceRolls',
    queryFn: async () => {
      const response = authToken.value
        ? await fetchDiceRolls(6)
        : await fetchDiceRollsMock(6)
      return response.data
    },
    onSuccess: (score) => {
      if (diceScores.value) {
        diceScores.value.push(score)
        return
      }
      diceScores.value = [score]
    },
    enabled: false,
    refetchOnMount: false,
  })

  const handleRollDice = () => {
    rolling.value = true
    const dices = setInterval(() => {
      const newDices: DiceRollType = []
      for (let x = 0; x < numberOfDices; x++) {
        newDices.push(Math.ceil(Math.random() * 6))
      }
      roll.value = newDices
    }, 500)
    const easing = setInterval(() => {
      easeIn.value = !easeIn.value
    }, 250)
    setTimeout(() => {
      clearInterval(dices)
      clearInterval(easing)
      rolling.value = false
      refetch()
    }, 3000)
  }

  const isRolling = isFetching || rolling.value

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'left',
      }}
    >
      <Stack sx={{ flex: 1 }}>
        <h1>Dice Roller</h1>
        <Button
          type='button'
          onClick={handleRollDice}
          variant='contained'
          color='secondary'
          disabled={isRolling}
        >
          {isRolling ? 'Rolling...' : 'Roll Dice'}
        </Button>
        <div>
          <h2>Dice Rolls:</h2>
          <Stack
            direction={'row'}
            spacing={3}
          >
            {isRolling && (
              <>
                {roll.value?.map((dice, index) => (
                  <Dice
                    key={index}
                    face={dice || 1}
                    easeIn={easeIn.value}
                  />
                ))}
              </>
            )}
            {!isRolling && isSuccess && (
              <>
                {score &&
                  score.score.map((value, index) => (
                    <Dice
                      face={value}
                      key={index}
                      easeIn={easeIn.value}
                    />
                  ))}
              </>
            )}
            {!isRolling && isError && (
              <Alert severity='error'>{`An error occurred: ${error}`}</Alert>
            )}
          </Stack>
        </div>
      </Stack>
      <Scores />
    </div>
  )
}

export default DiceRoll
