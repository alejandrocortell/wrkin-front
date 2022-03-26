import { Checkbox } from './checkbox'
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from 'utils/test-utils'

describe('Button', async () => {
    it('Should render checkbox', () => {
        let checked = true
        render(
            <Checkbox
                onChange={() => (checked = !checked)}
                checked={checked}
                label={'Label checkbox'}
            />
        )
        expect(screen.getByText('Label checkbox')).toBeInTheDocument()
        expect(screen.getByRole('checkbox')).toHaveAttribute('type', 'checkbox')
    })

    it('Should render change the checkbox', () => {
        // render(
        //     <Checkbox
        //         onChange={() => {}}
        //         checked={true}
        //         label={'Label checkbox'}
        //     />
        // )
        // expect(screen.getByRole('checkbox')).toBeChecked()
        const { getByRole } = render(
            <Checkbox
                onChange={() => {}}
                checked={true}
                label={'Label checkbox'}
            />
        )
        const checkbox = getByRole('checkbox')
        expect(checkbox).toBeChecked()
        fireEvent.click(checkbox)
    })
})
