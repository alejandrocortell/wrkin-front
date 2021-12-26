import { Route, Routes } from 'react-router-dom'
import { FourOFour } from '../pages/404/404'
import { Home } from '../pages/home/home'

export const App = () => (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<FourOFour />} />
    </Routes>
)
