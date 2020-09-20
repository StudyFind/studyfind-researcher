import React from 'react'
import { render, screen } from '@testing-library/react'

import Input from './Input'

const typeArgs = {
    'text': {},
    'textarea': {},
    'email': {},
    'password': {},
    'date': {},
    'radio': { options: ['A', 'B'] },
    'tabselect': {},
    'select': {},
    'dropdown': { options: ['A', 'B'] }
}
const defaultArgs = {}

Object.keys(typeArgs).forEach(type => {
    describe(`Input ${type}`, () => {

        const args = { ...typeArgs[type], ...defaultArgs, type }

        it('renders without errors', () => {
            expect(() => render(<Input {...args} />)).not.toThrow(Error)
        })

        it('shows given title and error', () => {
            render(<Input {...args} name="TEST_NAME" prompt="TEST_NAME" error="TEST_ERROR" />)

            expect(screen.getByText(/TEST_NAME/)).toBeInTheDocument()
            expect(screen.getByText(/TEST_ERROR/)).toBeInTheDocument()
        })

    })
})
