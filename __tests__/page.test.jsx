import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Index from '../app/page.tsx'


describe('Page', () => {
  it('renders a heading', async () => {
    render(await Index())

    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})