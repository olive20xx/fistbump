import Wave from 'react-wavify'

export default function WaveImage() {
    return (
    <Wave
        className="opacity-30 absolute bottom-0 z-0"
        fill="#03BCA7"
        paused={false}
        style={{ display: 'flex' }}
        options={{
        height: 20,
        amplitude: 20,
        speed: 0.25,
        points: 3,
        }
    }
  />
  )
}