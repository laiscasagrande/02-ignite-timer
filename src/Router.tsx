import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { History } from './pages/History'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/*Nesse caso, como queremos que o usuário não digite nada, ou seja, caia direto na Home, colocamos/. O element é o componente dessa rota */}
      <Route path="/history" element={<History/>}/>
    </Routes>
  )
}