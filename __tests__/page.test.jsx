import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Index from '@/app/page'


describe('Page', () => {
  it('renders a heading', async () => {
    render(await Index())

    expect("Index").toBeInTheDocument()
  })
})