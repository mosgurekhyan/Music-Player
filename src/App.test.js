import { render } from '@testing-library/react'
import App from './App'

test('App', () => {
  it('App work correctly', () => {
    const { getByTestId } = render(<App initialValue={0} />)
    const songName = getByTestId('song').textContent
    expect(songName).toEqual(0)
  })
})