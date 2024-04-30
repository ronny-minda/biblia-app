import { useState } from 'react'
import { useDataBliblia } from '../store/dataBiblia'
import { motion, AnimatePresence } from 'framer-motion'

const Home = () => {
  const { biblia } = useDataBliblia()

  // console.log(biblia)

  return (
    <>
      <h1 className="font-bold text-[20px]">Referencias</h1>

      {biblia.map((value, key) => {
        return (
          <div key={key}>
            <Arbol1 items={value} indice={key} />
          </div>
        )
      })}
    </>
  )
}

export default Home

const Arbol1 = ({ items }) => {
  const [ver, setVer] = useState(false)

  const { data, titulo } = items

  console.log('items')
  console.log(items)

  return (
    <div className="w-full shadow-lg bg-slate-100 border rounded-md p-3">
      <h3
        onClick={() => setVer(!ver)}
        className="cursor-pointer bg-slate-200 hover:bg-slate-300 transition-colors rounded-md py-1 px-2 shadow-md"
      >
        {titulo}
      </h3>
      <AnimatePresence onExitComplete>
        {ver && (
          <motion.div
            initial={{ height: 0, padding: 0, marginTop: '0px' }}
            animate={{ height: 'auto', padding: '12px', marginTop: '16px' }}
            exit={{ height: 0, padding: 0, marginTop: '0px' }}
            className="overflow-hidden rounded-md"
            style={{ boxShadow: '0px 0px 20px 1px #cbd5e1 inset' }}
          >
            {data.map((value, key) => {
              return (
                <div key={key}>
                  <Arbol2 items={{ data: value, titulo: key }} />
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const Arbol2 = ({ items }) => {
  const { data, titulo } = items

  const [ver, setVer] = useState(false)

  return (
    <>
      <div
        onClick={() => setVer(!ver)}
        className="cursor-pointer bg-slate-200 hover:bg-slate-300 transition-colors rounded-md py-1 px-2 shadow-md my-3"
      >
        {titulo + 1}
      </div>

      <AnimatePresence>
        {ver && (
          <motion.div
            initial={{ height: 0, padding: 0 }}
            animate={{ height: 'auto', padding: '12px' }}
            exit={{ height: 0, padding: 0 }}
            className="overflow-hidden rounded-md"
            style={{ boxShadow: '0px 0px 20px 1px #cbd5e1 inset' }}
          >
            {data.map((valor, llave) => {
              return (
                <div>
                  {/* {llave} */}
                  <Arbol3 items={{ data: valor, titulo: llave }} />
                </div>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const Arbol3 = ({ items }) => {
  const [ver, setVer] = useState(false)

  const { data, titulo } = items

  return (
    <div className="cursor-pointer">
      <h4
        onClick={() => setVer(!ver)}
        className="cursor-pointer bg-slate-200 hover:bg-slate-300 transition-colors rounded-md py-1 px-2 shadow-md my-3"
      >
        {titulo + 1}
      </h4>

      <AnimatePresence>
        {ver && (
          <motion.div
            initial={{ height: 0, padding: 0 }}
            animate={{ height: 'auto', padding: '12px' }}
            exit={{ height: 0, padding: 0 }}
            className="overflow-hidden rounded-md"
            style={{ boxShadow: '0px 0px 20px 1px #cbd5e1 inset' }}
          >
            {data}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
