import { useState } from 'react'
import Lupa from '../store/lupa'
import { motion } from 'framer-motion'

const Buscar = () => {
  const [busqueda, setBusqueda] = useState('')

  const [items, setItems] = useState([])

  window.electron.ipcRenderer.on('RESPUESTA_BUSQUEDA', (e, agr) => {
    // console.log(agr)
    const { items: result } = agr

    const filtro = result.filter((value) => value.type == 'video')

    console.log(filtro)
    setItems(filtro)
  })

  return (
    <>
      <div className="w-full h-10 flex justify-start items-center shadow-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (busqueda.length != 0) {
              console.log('envido')
              window.electron.ipcRenderer.send('BUSCAR', { buscar: busqueda })
            }
          }}
          className="relative w-1/2 ml-2"
        >
          <div className="h-4 w-4 absolute top-1/2 left-1 -translate-y-1/2">
            <Lupa />
          </div>
          <input
            onChange={(e) => {
              const value = e.target.value
              // console.log(value)
              setBusqueda(value)
            }}
            value={busqueda}
            type="text"
            className=" text-slate-400 focus:text-slate-700 hover:text-slate-700 pl-[25px] border-b-[2px] border-b-red-300 hover:border-red-600 focus:border-red-600 w-full text-[15px]"
          />
        </form>
      </div>

      <div
        className="w-full p-3 flex flex-wrap items-start justify-center overflow-auto"
        style={{ height: 'calc(100% - 40px)', alignContent: 'flex-start' }}
      >
        {items.length == 0 && <div>No hay nada en la busqueda</div>}
        {items.map((value, key) => {
          const { url, title, bestThumbnail } = value
          // console.log(bestThumbnail)
          return (
            <motion.div
              whileHover={{
                y: -6
              }}
              transition={{ duration: 0.1 }}
              key={key}
              className="h-[150px] w-[150px] bg-slate-200 hover:bg-slate-300 shadow hover:shadow-lg rounded-md m-2 cursor-pointer border-[1px] border-white"
            >
              {/* <img src={bestThumbnail?.url} alt="img" /> */}
            </motion.div>
          )
        })}
      </div>
    </>
  )
}

export default Buscar
