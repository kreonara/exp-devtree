import { Link, Outlet } from "react-router";
import { Toaster } from "sonner";
import NavigationTabs from "../components/NavigationTabs";
import type { SocialNetwork, User } from "../types";
import { useEffect, useRef, useState } from "react";
import DevTreeLink from "./DevTreeLink";
import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";
import {move} from '@dnd-kit/helpers';
import { useQueryClient } from '@tanstack/react-query';

type DevTreeProps = {
  data: User
}

function Sortable({ link, index }: {link: SocialNetwork, index: number}) {
  const [element, setElement] = useState<Element | null>(null)
  // const handleRef = useRef<any | null>(null)
  const { isDragging } = useSortable({
    id: link.id,
    index,
    element,
    // handle: handleRef
  })

  // return <DevTreeLink handleRef={handleRef} key={link.name} link={link} setElement={setElement} isDragging={isDragging} />
  return <DevTreeLink key={link.name} link={link} setElement={setElement} isDragging={isDragging} />
}

const DevTree = ({ data }: DevTreeProps) => {
  const eLinks = JSON.parse(data.links).filter((item: SocialNetwork) => item.enabled)
  const [enabledLinks, setEnabledLinks] = useState<SocialNetwork[]>(eLinks)

  useEffect(() => {
    setEnabledLinks(eLinks)
  }, [data])
  
  const queryClient = useQueryClient()
  const handleDragEnd = (event: any) => {
    setEnabledLinks( enabledLinks => {
      const newOrder = move(enabledLinks, event)
      const disabledLinks: SocialNetwork[] = JSON.parse(data.links).filter((item: SocialNetwork) => !item.enabled)
      const links = newOrder.concat(disabledLinks)

      queryClient.setQueryData(['user'], (prevData: User) => {
        return {
          ...prevData,
          links: JSON.stringify(links)
        }
      })

      return newOrder
    })


  }

  return (
    <>
      <header className="bg-slate-800 py-5">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
          <div className="w-full p-5 lg:p-0 md:w-1/3">
            <img src="/logo.svg" className="w-full block" />
          </div>
          <div className="md:w-1/3 md:flex md:justify-end">
            <button
              className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
              onClick={() => { }}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
      <div className="bg-gray-100  min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">

          <NavigationTabs />

          <div className="flex justify-end">
            <Link
              className="font-bold text-right text-slate-800 text-2xl"
              to={''}
              target="_blank"
              rel="noreferrer noopener"
            >Visitar Mi Perfil: /{data.handle}</Link>
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-1 ">
              <Outlet />
            </div>
            <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
              <p className="text-4xl text-center text-white">{data.handle}</p>

              {
                data.image &&
                  <img 
                    className="mx-auto max-w-[250px]"
                    src={data.image} 
                    alt="Imagen Perfil" 
                  />
              }

              <p className="text-center text-lg font-black text-white">{data?.description}</p>

              <DragDropProvider
                onDragEnd={handleDragEnd}
              >
                <ul className="mt-20 flex flex-col gap-5">
                  {
                    enabledLinks.map((link, index) => (
                      <Sortable key={link.name} link={link} index={index} />
                    ))
                  }
                </ul> 
              </DragDropProvider>

            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </>
  )
}

export default DevTree