import { useState } from 'react'
import { useUi } from '../store/ui'
// import Lupa from '../store/lupa'

const Aside = () => {
  // const { cambiarPage, page } = useUi()

  // const items = [
  //   {
  //     nombre: 'buscar',
  //     Ico: Lupa
  //   },
  //   {
  //     nombre: 'Lupa',
  //     Ico: Lupa
  //   },
  //   {
  //     nombre: 'Lupa',
  //     Ico: Lupa
  //   },
  //   {
  //     nombre: 'Lupa',
  //     Ico: Lupa
  //   },
  //   {
  //     nombre: 'Lupa',
  //     Ico: Lupa
  //   }
  // ]

  return (
    <>
      <div className="h-full w-[50px] bg-slate-200 flex flex-col justify-center items-center">
        a
        {/* {items.map((value, key) => {
          const { Ico, nombre } = value
          return (
            <div
              key={key}
              onClick={() => {
                console.log(nombre)
                cambiarPage(nombre)
              }}
              className="h-[40px] w-[40px] bg-slate-200 hover:bg-slate-300 cursor-pointer shadow-md hover:shadow-lg my-2 rounded-md p-[10px] shadow-slate-400 hover:shadow-slate-400 border border-slate-200"
            >
              <Ico />
            </div>
          )
        })} */}
      </div>
    </>
  )
}

export default Aside
