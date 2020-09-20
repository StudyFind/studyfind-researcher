import React from 'react'
import { render, screen } from '@testing-library/react'

import Badge from './Badge'
import { colors } from './../../constants'

describe('Badge', () => {


    it('renders without errors', () => {
        expect(() => render(<Badge />)).not.toThrow(Error)
    })

    it('renders given children', () => {
        render(<Badge><p>TEST_TEXT</p></Badge>)

        expect(screen.getByText(/TEST_TEXT/)).toBeInTheDocument()
    })

    it('is the correct color', () => {
        render(<Badge data-testid="TEST_COMPONENT" color="secondary" ></Badge>)

        expect(screen.getByTestId("TEST_COMPONENT")).toHaveStyleRule('background', colors.secondary.hard)
    })

})
