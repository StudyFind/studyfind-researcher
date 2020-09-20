import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

import Button from './Button'
import { colors } from './../../constants'

describe('Button', () => {

    it('renders without errors', () => {
        expect(() => render(<Button />)).not.toThrow(Error)
    })

    it('contains item with button role', () => {
        render(<Button />)

        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('renders given children', () => {
        render(<Button><p>TEST_TEXT</p></Button>)

        expect(screen.getByText(/TEST_TEXT/)).toBeInTheDocument()
    })

    it('has the given background color', () => {
        render(<Button data-testid="TEST_COMPONENT" color="secondary" />)

        expect(screen.getByTestId("TEST_COMPONENT")).toHaveStyleRule('background', colors.secondary.hard)
    })

    it('runs callback on click', async () => {
        const fn = jest.fn()
        render(<Button onClick={fn} />)

        await userEvent.click(screen.getByRole('button'))
        expect(fn).toBeCalledTimes(1)
    })

    it('doesn\'t run callback when disabled/loading', async () => {
        const fn = jest.fn()
        render(<Button onClick={fn} disabled />)
        await userEvent.click(screen.getByRole('button'))
        expect(fn).toBeCalledTimes(0)

        cleanup()
        render(<Button onClick={fn} loading />)
        await userEvent.click(screen.getByRole('button'))
        expect(fn).toBeCalledTimes(0)
    })

})
