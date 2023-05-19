import { render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Component from './Component'

vi.mock('moduleFederationTypescript/button')
vi.mock('moduleFederationTypescript/anotherButton')

describe('Component', () => {
    it('can test federated components', () => {
        const { asFragment } = render(<Component />)

        expect(asFragment()).toMatchSnapshot()
    })
})