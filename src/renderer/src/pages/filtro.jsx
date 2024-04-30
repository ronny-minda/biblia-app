import { motion, AnimatePresence } from 'framer-motion'

import { useDataBliblia } from '../store/dataBiblia'
import { useState } from 'react'

const Filtro = () => {
  const { biblia } = useDataBliblia()

  // const bibliaFiltrada = biblia.filter((value) => value.titulo == '1 Corintios')

  const [bibliaFiltrada, setBibliaFiltrada] = useState(
    biblia.filter((value) => value.titulo == '1 Corintios')
  )

  const [menu, setMenu] = useState(false)
  const [libroBusqueda, setLibroBusqueda] = useState('')

  return (
    <>
      {/* <h1 className="mt-[80px]">Filtro</h1> */}

      <form
        onSubmit={(e) => e.preventDefault()}
        className="max-w-md mx-auto fixed top-2 left-2 w-[500px] shadow-xl z-50"
      >
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Buscar
        </label>
        <div className="relative">
          {libroBusqueda.length != 0 && (
            <ul className="absolute top-full left-10 bg-slate-100 p-1 shadow-md opacity-50">
              {biblia.map((value, key) => {
                if (value.titulo.toLowerCase().includes(libroBusqueda)) {
                  return (
                    <li
                      key={key}
                      // onClick={() => {
                      //   setBibliaFiltrada(biblia.filter((value) => value.titulo == titulo))
                      // }}
                    >
                      {value.titulo}
                    </li>
                  )
                }
              })}
              {/* {biblia.map((value, key) => {
                if (value.titulo.toLowerCase().include(libroBusqueda)) {
                }
              })} */}
            </ul>
          )}
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ejemplo: 1 Corintios 9 14"
            required
            onChange={(e) => {
              const value = e.target.value.toLowerCase()

              let numeroLibro = value[0]
              let nombreLibro = ''

              try {
                nombreLibro = value.match(/[a-zA-Z]+/)[0]
              } catch (error) {}

              if (!isNaN(numeroLibro)) {
                // console.log('Es un número')
              } else {
                // console.log('No es un número')
                numeroLibro = ''
              }

              const libroFiltro = `${numeroLibro} ${nombreLibro}`.trim()

              setLibroBusqueda(libroFiltro)

              // console.log(libroFiltro)

              setBibliaFiltrada(biblia.filter((value) => value.titulo.toLowerCase() == libroFiltro))

              setTimeout(() => {
                // Selecciona todos los elementos con la clase 'mi-clase'
                var elementos = document.querySelectorAll('.uso')

                const elemento = document.getElementById(value)
                // Itera sobre cada elemento y cámbiale el color de fondo
                elementos.forEach(function (elemento) {
                  elemento.style.color = '#0005' // Cambia 'rojo' por el color que desees
                })

                if (elemento) {
                  elemento.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  elemento.style.color = '#000'
                } else {
                  // Itera sobre cada elemento y cámbiale el color de fondo
                  elementos.forEach(function (elemento) {
                    elemento.style.color = '#000' // Cambia 'rojo' por el color que desees
                  })
                }
              }, 10)
            }}
          />
          <button
            type="submit"
            className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Buscar
          </button>
        </div>
      </form>

      <div
        className="h-7 w-7 fixed top-[70px] left-3 cursor-pointer"
        onClick={() => setMenu(!menu)}
      >
        <Hamburger />
      </div>
      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed z-[999] top-0 left-0 w-full h-full bg-black bg-opacity-50"
            onClick={() => setMenu(!menu)}
          ></motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {menu && (
          <motion.div
            initial={{ opacity: 0, x: -500 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -500 }}
            transition={{ damping: 0 }}
            className="fixed z-[9999] top-0 left-0 w-[200px] h-full bg-white shadow-2xl p-3"
          >
            <div className="h-[50px] w-full flex justify-center items-center text-[25px]">
              Santa Biblia
            </div>
            <div
              className="w-full overflow-y-auto p-3 scroll rounded"
              style={{
                height: 'calc(100% - 50px)',
                boxShadow: '0px 0px 15px 3px rgba(0,0,0,0.30) inset'
              }}
            >
              {biblia.map((value, key) => {
                const { titulo, data } = value
                return (
                  <div
                    className="cursor-pointer my-2 bg-slate-100 hover:bg-slate-200 transition-colors border border-slate-200 hover:border-slate-300 p-1 shadow-lg hover:shadow-xl rounded-[3px] text-slate-700"
                    key={key}
                    onClick={() => {
                      setBibliaFiltrada(biblia.filter((value) => value.titulo == titulo))
                      setTimeout(() => {
                        setMenu(!menu)
                      }, 10)
                    }}
                    title={data.length}
                  >
                    {titulo}
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="w-full min-h-screen h-auto flex justify-center bg-white bg-opacity-85">
        <div className="w-[80%] md:w-[50%] mb-[100px]">
          {bibliaFiltrada.length == 0 && (
            <div className="h-full w-full flex justify-center items-center">
              <div className="text-[50px] text-center">No se a encontrado el libro.</div>
            </div>
          )}

          {bibliaFiltrada.map((value, key) => {
            const { titulo, data } = value
            return (
              <div key={key} className="my-5 relative">
                <h3
                  className="sticky top-[70px] left-0 bg-white text-[30px] font-bold shadow-xl mb-5 inline-block p-2 mt-[80px] z-[9] px-6"
                  style={{
                    background:
                      'linear-gradient(80deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)'
                  }}
                >
                  {titulo}
                </h3>

                {data.map((value, key) => {
                  return (
                    <div key={key}>
                      <b
                        className="text-[20px] block text-center sticky top-[150px] p-0 shadow-xl"
                        style={{
                          background:
                            'linear-gradient(80deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%)'
                        }}
                      >
                        {titulo} {key + 1}
                      </b>
                      {value.map((valor, llave) => {
                        return (
                          <div
                            className="inline text-[20px] hover:bg-slate-200 active:bg-slate-300 uso"
                            id={`${titulo.toLowerCase()} ${key + 1} ${llave + 1}`}
                            title={`${titulo.toLowerCase()} ${key + 1} ${llave + 1}`}
                            key={llave}
                          >
                            <b className="text-[12px] mx-1">{llave + 1}</b>
                            <p className="inline">{valor}</p>
                          </div>
                        )
                      })}
                    </div>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>

      <div
        className="h-[200px] w-full bg-white fixed z-[99] bottom-0 left-0"
        style={{
          background: 'linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)'
        }}
      ></div>

      <div className="h-6 w-full bg-white fixed z-[999] bottom-0 left-0 text-[14px] flex justify-end items-center p-2">
        App desarrollada por
        <a
          href="https://ronnyminda.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 flex justify-center items-center group text-slate-950 hover:text-slate-600 transition-colors"
          title="Ver pagina mi pagina web."
        >
          Ronny Minda V.
          <div className="h-6 w-6 ml-1">
            <Logo />
          </div>
        </a>
      </div>
    </>
  )
}

export default Filtro

const Logo = () => {
  return (
    <>
      <svg
        className="h-full w-full group-hover:fill-slate-600 fill-slate-950 transition-colors"
        viewBox="0 0 311 363"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M225.067 0.487121C219.682 0.613241 212.503 3.39741 206.815 6.93353C200.752 10.7052 192.5 22.9389 190.991 22.9342C189.482 22.927 184.299 14.6935 178.469 12.5471C172.639 10.403 161.253 15.6787 161.253 15.6787C161.253 15.6787 152.136 22.7438 150.889 23.0246C149.645 23.3054 141.428 28.374 141.428 28.374C141.428 28.374 122.748 46.4949 120.906 47.1064C119.067 47.7156 115.576 39.9747 112.911 38.7587C110.243 37.5427 86.1421 31.8887 80.2144 32.8453C74.2892 33.8043 67.6048 43.4941 66.3031 43.4537C64.9991 43.4132 55.2712 31.941 53.9529 31.803C52.8892 31.6888 23.1129 39.5844 20.9117 42.2353C18.7153 44.8862 11.793 67.0215 12.8472 72.7303C13.9037 78.439 39.9987 80.583 39.6941 89.0188C39.5942 91.8101 19.1246 93.7543 17.9562 94.7823C16.7854 95.8103 1.26074 121.713 1.26074 121.713C1.26074 121.713 -0.65248 149.53 0.218464 150.754C1.08941 151.979 17.1329 156.46 19.522 156.493C21.9112 156.527 35.7511 146.473 39.5204 150.754C40.7293 152.127 35.9748 169.315 27.2939 174.688C18.613 180.061 18.1157 200.631 18.9985 203.274C19.8813 205.916 31.1727 218.925 31.1727 218.925C31.1727 218.925 50.3715 218.164 52.5655 216.143C54.7548 214.123 57.6627 197.83 58.9977 196.145C60.3303 194.458 68.5685 191.521 69.4323 190.753C70.2961 189.986 75.5789 181.974 77.7801 182.752C79.9812 183.533 76.7854 197.397 78.9984 213.012C81.2115 228.629 87.0939 236.463 85.5686 241.508C84.1432 246.231 71.2504 239.571 70.0891 247.8C68.9279 256.031 78.3012 261.011 78.3012 261.011L78.8247 268.838L86.1278 271.62L85.7804 276.664L90.8228 280.315L89.9543 286.402L106.823 295.097L128.04 297.881C128.04 297.881 107.856 311.397 98.4757 321.88C89.0952 332.36 73.204 362.35 73.204 362.35L282.204 362.317C282.204 362.317 274.732 350.119 273.364 347.63C271.998 345.138 259.503 317.694 248.73 306.971C237.96 296.249 225.503 282.778 225.6 280.836C225.7 278.894 239.602 274.832 243.861 269.706C248.121 264.581 250.263 255.495 249.546 253.706C248.828 251.916 243.202 254.834 242.986 254.377C242.772 253.922 261.544 201.88 264.731 184.492C267.92 167.106 262.994 147.101 262.994 147.101C262.994 147.101 281.443 150.494 288.382 147.451C295.321 144.405 301.153 134.156 301.772 132.495C302.391 130.831 301.077 111.452 301.077 111.452C301.077 111.452 289.231 105.243 289.512 103.884C289.793 102.528 305.772 94.7561 305.772 94.7561C305.772 94.7561 311.245 76.0832 310.467 73.1919C309.692 70.3007 290.469 56.4964 290.469 56.4964L263.686 54.5832L259.688 49.8882C259.688 49.8882 257.728 37.1144 254.548 34.4825C252.138 32.486 244.43 24.8973 243.861 24.2358C242.598 22.7676 241.213 9.74387 237.601 5.54144C233.988 1.33902 231.597 0.751254 226.124 0.496634C225.773 0.480872 225.421 0.476901 225.07 0.484733L225.067 0.487121Z" />
      </svg>
    </>
  )
}

const Hamburger = () => {
  return (
    <>
      <svg
        className="h-full w-full hover:fill-slate-600 fill-slate-950 transition-colors"
        fill="none"
        strokeWidth="0"
        viewBox="0 0 15 15"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
        ></path>
      </svg>
    </>
  )
}
