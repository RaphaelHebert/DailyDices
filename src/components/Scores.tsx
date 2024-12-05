import React from 'react'

import {
  Typography,
  Stack,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material'
import { formatDate } from '@/services'

import { isLoggedIn, user } from '@/signals'

// TODO implement infinite query or query only last 100 scores?

const Scores: React.FC = () => {
  return (
    <Stack
      style={{
        minWidth: '25%',
        padding: '16px',
        marginLeft: '20px',
        height: '90vh',
      }}
    >
      <Typography
        variant='h5'
        gutterBottom
      >
        Last Dice Scores
      </Typography>
      <Paper
        elevation={3}
        sx={{ height: '80vh' }}
      >
        {isLoggedIn && (
          <List>
            {user.value &&
              user.value.scores &&
              user.value.scores.map((value, index) => {
                return (
                  <React.Fragment key={value.id}>
                    <ListItem>
                      <ListItemText
                        sx={{ marginRight: 4 }}
                        secondary={formatDate(value.date * 1000)}
                      />
                      <ListItemText
                        primary={value.score.map((num) => (
                          <span
                            style={{
                              marginRight: '4px',
                              padding: '4px',
                              border: '1px solid grey',
                            }}
                            key={value.id + num}
                          >
                            {num}
                          </span>
                        ))}
                      />
                    </ListItem>
                    {index < user.value.scores.length - 1 && <Divider />}
                  </React.Fragment>
                )
              })}
          </List>
        )}
      </Paper>
    </Stack>
  )
}

export default Scores
