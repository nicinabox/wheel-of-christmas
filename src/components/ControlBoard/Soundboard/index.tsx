import React from 'react'
import $ from 'styled-components'
import * as Sounds from 'sounds'
import { ControlBoardSection, ControlBoardSectionTitle } from '../styled'
import { isStopped, isPaused } from 'sounds'
import { CurrentSoundState } from 'store/reducers/currentSound'
import { useDispatch } from 'react-redux'
import { setSoundStatus, setSoundVolume, setCurrentSound } from 'store/actions/soundsActions'
import { Button } from 'styled/buttons'
import { lighten } from 'polished'

interface SoundboardProps {
  currentSound: CurrentSoundState
}

export const Soundboard: React.FC<SoundboardProps> = ({ currentSound }) => {
  const dispatch = useDispatch()

  return (
    <ControlBoardSection>
      <ControlBoardSectionTitle>
        Sounds

        <div>
          {!isStopped(currentSound.status) && (
            <span>{Sounds.getSoundName(currentSound.sound)}</span>
          )}

          {Sounds.isPlaying(currentSound.status) && (
            <Button
              onClick={() => dispatch(setSoundStatus('PAUSED'))}
              disabled={currentSound.status !== 'PLAYING'}>
              Pause
            </Button>
          )}
          {isPaused(currentSound.status) && (
            <Button
              onClick={() => dispatch(setSoundStatus('PLAYING'))}>
              Play
            </Button>
          )}
          <Button
            onClick={() => dispatch(setSoundStatus('STOPPED'))}
            disabled={isStopped(currentSound.status)}>
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
        </div>
      </ControlBoardSectionTitle>

      <SoundboardWrapper>
          {[
            Sounds.BANKRUPT,
            Sounds.PRIZE,
            Sounds.MYSTERY,
            Sounds.EXPRESS,
            Sounds.HALF_CARD,
            Sounds.WILD_CARD,
            Sounds.THEME,
          ].map((sound, i) => (
            <SoundboardButton
              key={i}
              sound={sound}
              onClick={() => dispatch(setCurrentSound(sound))}>
              {Sounds.getSoundName(sound)}
            </SoundboardButton>
          ))}
      </SoundboardWrapper>
    </ControlBoardSection>
  )
}

const SoundboardWrapper = $.div`
  display: flex;
`

const SoundboardButton = $(Button)<{ sound: string }>`
  width: 100%;
  background: ${props => Sounds.WedgeColors[props.sound] || '#1a4048'}

  &:hover {
    background: ${props => lighten(0.1, Sounds.WedgeColors[props.sound] || '#1a4048')};
  }
`

const StyledFieldset = $.fieldset`
  flex: 1;
`

const RangeInput = $.input`
`

export default Soundboard
