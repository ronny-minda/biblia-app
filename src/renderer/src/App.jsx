import Aside from './components/aside'
import ListaVideos from './components/listaVideos'
import Buscar from './pages/buscar'
import Filtro from './pages/filtro'
import Home from './pages/home'
import { useUi } from './store/ui'
import { motion, AnimatePresence } from 'framer-motion'

const App = () => {
  const { cambiarPage, page } = useUi()

  return (
    <>
      {/* <h1>app</h1> */}
      {/* <ListaVideos /> */}
      <div className="fondo1">
        {/* <Home /> */}
        <Filtro />
      </div>
    </>
  )
}

export default App
