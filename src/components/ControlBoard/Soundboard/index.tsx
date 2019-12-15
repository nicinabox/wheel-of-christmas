import { lighten } from 'polished'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Sound from 'react-sound'
import * as Sounds from 'sounds'
import { setSoundVolume } from 'store/actions/soundsActions'
import { CurrentRoundState } from 'store/reducers/currentRound'
import { CurrentSoundState } from 'store/reducers/currentSound'
import $ from 'styled-components'
import { Button } from 'styled/buttons'
import { WedgeColors } from 'styled/colors'
import { RangeInput } from 'styled/forms'
import { Details, DetailsSection, Section, Summary, SummaryActions } from '../styled'

interface SoundboardProps {
  currentRound: CurrentRoundState
  currentSound: CurrentSoundState
}

export const Soundboard: React.FC<SoundboardProps> = ({ currentSound, currentRound }) => {
  const dispatch = useDispatch()
  const [sounds, setSounds] = useState<string[]>([])

  const { round_type } = currentRound

  return (
    <Section>
      {sounds.map(sound => (
        <Sound
          key={sound}
          url={require(`sounds/${sound}`)}
          playStatus="PLAYING"
          volume={currentSound.volume}
          onFinishedPlaying={() => setSounds(sounds.filter(s => s !== sound))}
        />
      ))}

      <Details open={!Boolean(round_type)}>
        <Summary>
          SOUNDS

          <SummaryActions>
            🔈
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
              Sounds.FINAL_ROUND,
              Sounds.THEME,
              Sounds.BUZZER,
            ].map((sound, i) => {
              const isPlaying = sounds.includes(sound)
              return (
                <SoundboardButton
                  key={i}
                  sound={sound}
                  onClick={() => {
                    if (isPlaying) {
                      setSounds(sounds.filter(s => s !== sound))
                    } else {
                      setSounds(sounds.concat(sound))
                    }
                  }}>
                  {isPlaying && `⏹️`} {Sounds.getSoundName(sound)}
                </SoundboardButton>
              )
            })}
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

export const FlexSection = $.div`
  display: flex;
  flex-wrap: wrap;
`

export default Soundboard
