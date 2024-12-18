import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { DefaultLayout } from './layouts/DefaultLayout'
import { History } from './pages/History'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout/>}>{/*Nós estamos envolvendo todas as rotas neste Route. Apliquei a / porque eu quero aplicar esse layout em todas as rotas. Assim, suponhamos que temos uma rota /admin e aplicamos o DefaultLayout nela. Desse modo, nós estamos passado o layout para todas as rotas que começam com /admin. Além disso, se tivermos rotas por dentro desta, todas elas começaram por /admin. Exemplo: /admin/products, pois uma é filha da outra*/}
        <Route path="/" element={<Home />} /> {/*Nesse caso, como queremos que o usuário não digite nada, ou seja, caia direto na Home, colocamos/. O element é o componente dessa rota */}
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}