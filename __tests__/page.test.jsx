import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Index from '../app/page.tsx'

describe('Index', () => {
  it('renders a heading', () => {
    render(<Index />)

    const text = screen.getByText(/Index Page/);
    expect(text).toBeInTheDocument()
  })
})