import { Dropdown } from './dropdown'
import '@testing-library/jest-dom'
import { fireEvent, render, screen, within } from 'utils/test-utils'

describe('Button', async () => {
    it('Should render the dropdown', () => {
        render(
            <Dropdown
                onChange={() => {}}
                value={'First'}
                label={'Type'}
                list={[
                    { value: 'first' },
                    { value: 'second' },
                    { value: 'third' },
                ]}
                error={false}
                errorText={'Error text'}
            />
        )
        expect(screen.getByText('Type')).toBeInTheDocument()
        expect(screen.getByText('First')).toBeInTheDocument()
        expect(screen.getByText('Second')).toBeInTheDocument()
        expect(screen.getByText('Third')).toBeInTheDocument()
        expect(screen.queryByText('Error text')).not.toBeInTheDocument()
    })

    it('Should render the dropdown with error', () => {
        render(
            <Dropdown
                onChange={() => {}}
                value={'First'}
                label={'Type'}
                list={[
                    { value: 'first' },
                    { value: 'second' },
                    { value: 'third' },
                ]}
                error={true}
                errorText={'Error text'}
            />
        )
        expect(screen.getByText('Error text')).toBeInTheDocument()
    })

    it('Should render the dropdown and fire the event', () => {
        render(
            <Dropdown
                onChange={() => {}}
                value={'First'}
                label={'Type'}
                list={[
                    { value: 'first' },
                    { value: 'second' },
                    { value: 'third' },
                ]}
                error={true}
                errorText={'Error text'}
            />
        )
        fireEvent.change(screen.getByDisplayValue('First'), {
            target: { value: 'Second' },
        })
    })

    it('Should render the dropdown required', () => {
        render(
            <Dropdown
                onChange={() => {}}
                value={'First'}
                label={'Type'}
                required
                list={[
                    { value: 'first' },
                    { value: 'second' },
                    { value: 'third' },
                ]}
                error={false}
                errorText={'Error text'}
            />
        )
        expect(screen.getByTestId('label')).toHaveTextContent('*')
    })
})
