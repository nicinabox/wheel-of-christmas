import React from 'react'
import $ from 'styled-components'
import * as Sounds from 'sounds'
import { Section, DetailsSection, Summary, Details, SummaryActions } from '../styled'
import { isStopped, isPaused } from 'sounds'
import { CurrentSoundState } from 'store/reducers/currentSound'
import { useDispatch } from 'react-redux'
import { setSoundStatus, setSoundVolume, setCurrentSound } from 'store/actions/soundsActions'
import { Button } from 'styled/buttons'
import { lighten } from 'polished'
import { RangeInput } from 'styled/forms'
import { CurrentRoundState } from 'store/reducers/currentRound'
import { WedgeColors } from 'styled/colors'
import { setSecondarySound, setSecondarySoundStatus } from 'store/actions/secondarySoundsActions'
import { SecondarySoundState } from 'store/reducers/secondarySound'

interface SoundboardProps {
  currentRound: CurrentRoundState
  currentSound: CurrentSoundState
  secondarySound: SecondarySoundState
}

export const Soundboard: React.FC<SoundboardProps> = ({ currentSound, secondarySound, currentRound }) => {
  const dispatch = useDispatch()

  const { round_type } = currentRound

  return (
    <Section>
      <Details open={!Boolean(round_type)}>
        <Summary>
          SOUNDS

          <SummaryActions>
            {!isStopped(currentSound.status || secondarySound.status) && (
              <PlayingSoundName>
                {currentSound.status} {Sounds.getSoundName(currentSound.sound)}...
              </PlayingSoundName>
            )}

            {Sounds.isPlaying(currentSound.status) && (
              <Button
                onClick={() => {
                  dispatch(setSoundStatus('PAUSED'))
                  dispatch(setSecondarySoundStatus('PAUSED'))
                }}
                disabled={(currentSound.status) !== 'PLAYING'}>
                Pause
              </Button>
            )}
            {isPaused(currentSound.status) && (
              <Button
                onClick={() => {
                  dispatch(setSoundStatus('PLAYING'))
                  dispatch(setSecondarySoundStatus('PLAYING'))
                }}>
                Play
              </Button>
            )}
            <Button
              onClick={() => {
                dispatch(setSoundStatus('STOPPED'))
                dispatch(setSecondarySoundStatus('STOPPED'))
              }}
              disabled={isStopped(currentSound.status && secondarySound.status)}>
              Stop
            </Button>

            <RangeInput
              type="range"
              min={0}
              max={100}
              step={10}
              value={currentSound.volume}
              onChange={(e) => dispatch(setSoundVolume(Number(e.target.value)))}
            />
          </SummaryActions>
        </Summary>

        <DetailsSection>
          <FlexSection>
            {[
              Sounds.BANKRUPT,
              Sounds.PRIZE,
              Sounds.MYSTERY,
              Sounds.EXPRESS,
              Sounds.HALF_CARD,
              Sounds.WILD_CARD,
              Sounds.THEME,
              Sounds.BUZZER,
            ].map((sound, i) => (
              <SoundboardButton
              key={i}
              sound={sound}
              onClick={() => dispatch(setCurrentSound(sound))}>
              {Sounds.getSoundName(sound)}
              </SoundboardButton>
            ))}
          </FlexSection>
          <FlexSection>
            {[
              Sounds.FINAL_ROUND,
            ].map((sound, i) => (
              <SoundboardButton
              key={i}
              sound={sound}
              onClick={() => dispatch(setSecondarySound(sound))}>
              {Sounds.getSoundName(sound)}
              </SoundboardButton>
            ))}
          </FlexSection>
        </DetailsSection>
      </Details>
    </Section>
  )
}

const SoundboardButton = $(Button)<{ sound: string }>`
  flex: 1 1 20%;
  background: ${props => WedgeColors[props.sound] || '#1a4048'}

  &:hover {
    background: ${props => lighten(0.1, WedgeColors[props.sound] || '#1a4048')};
  }
`

const PlayingSoundName = $.span`
  margin-right: 1rem;
  display: inline-block;
  color: #8c959d;
`

export const FlexSection = $.div`
  display: flex;
  flex-wrap: wrap;
`

export default Soundboard
