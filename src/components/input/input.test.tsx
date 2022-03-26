import { InputField } from './input'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from 'utils/test-utils'

describe('Input', async () => {
    it('Should render the input', () => {
        render(
            <InputField
                onChange={() => console.log('click')}
                value={'Value test'}
                label={'Label test'}
                type={'text'}
                error={false}
                errorText={''}
                testTag='test-input'
            />
        )
        expect(screen.getByDisplayValue('Value test')).toBeInTheDocument()
        expect(screen.getByDisplayValue('Value test')).toHaveAttribute(
            'type',
            'text'
        )
        expect(screen.getByText('Label test')).toBeInTheDocument()
    })

    it('Should render the input with error', () => {
        render(
            <InputField
                onChange={() => console.log('click')}
                value={'Value test'}
                label={'Label test'}
                type={'text'}
                error={true}
                errorText={'Error message'}
                testTag='test-input'
            />
        )
        expect(screen.getByDisplayValue('Value test')).toHaveClass('error')
        expect(screen.getByText('Error message')).toBeInTheDocument()
    })

    it('Should render the input password type', () => {
        render(
            <InputField
                onChange={() => console.log('click')}
                value={'Value test'}
                label={'Label test'}
                type={'password'}
                error={false}
                errorText={'Error message'}
                testTag='test-input'
            />
        )
        expect(screen.getByDisplayValue('Value test')).toHaveAttribute(
            'type',
            'password'
        )
        screen.getByAltText('toggle visibility password').click()
        expect(screen.getByDisplayValue('Value test')).toHaveAttribute(
            'type',
            'text'
        )
        screen.getByAltText('toggle visibility password').click()
        expect(screen.getByDisplayValue('Value test')).toHaveAttribute(
            'type',
            'password'
        )
    })

    it('Should render the input email type', () => {
        render(
            <InputField
                onChange={() => console.log('click')}
                value={'Value test'}
                label={'Label test'}
                type={'email'}
                error={false}
                errorText={'Error message'}
                testTag='test-input'
            />
        )
        expect(screen.getByDisplayValue('Value test')).toHaveAttribute(
            'type',
            'email'
        )
    })

    it('Should render the input textarea', () => {
        const component = render(
            <InputField
                onChange={() => console.log('click')}
                value={'Value test'}
                label={'Label test'}
                type={'textarea'}
                error={false}
                errorText={'Error message'}
                testTag='test-input'
            />
        )
        const textarea = component.container.querySelector('.false')
        expect(textarea).toContainHTML('textarea')
    })
})
