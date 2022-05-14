import { Button } from './button'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from 'utils/test-utils'

describe('Button', async () => {
    it('Should render the button primary', () => {
        render(
            <Button
                onClick={() => console.log('click')}
                label={'Test button'}
                style={'primary'}
            />
        )
        expect(screen.getByText('Test button')).toBeInTheDocument()
        expect(screen.getByText('Test button')).not.toBeDisabled()
        expect(screen.getByText('Test button')).toHaveClass('primary')
    })

    it('Should render the button primary', () => {
        render(
            <Button
                onClick={() => console.log('click')}
                label={'Test button'}
                style={'secondary'}
            />
        )
        expect(screen.getByText('Test button')).toHaveClass('secondary')
    })

    it('Should render the button accept', () => {
        render(
            <Button
                onClick={() => console.log('click')}
                label={'Test button'}
                style={'accept'}
            />
        )
        expect(screen.getByText('Test button')).toHaveClass('accept')
    })

    it('Should render the button delete', () => {
        render(
            <Button
                onClick={() => console.log('click')}
                label={'Test button'}
                style={'delete'}
            />
        )
        expect(screen.getByText('Test button')).toHaveClass('delete')
    })

    it('Should render the button disabled', () => {
        render(
            <Button
                onClick={() => console.log('click')}
                label={'Test button'}
                style={'primary'}
                disabled
            />
        )
        expect(screen.getByText('Test button')).toBeDisabled()
    })

    it('Should render the button with loader', () => {
        const { container } = render(
            <Button
                onClick={() => console.log('click')}
                label={'Test button'}
                style={'primary'}
                loading
            />
        )
        expect(container.firstChild?.firstChild).toHaveClass('loader-button')
    })

    it('Should render the button and fire the event', () => {
        render(
            <Button
                onClick={() => console.log('click')}
                label={'Test button'}
                style={'primary'}
            />
        )
        const button = screen.getByText('Test button')
        fireEvent.click(button)
    })
})
