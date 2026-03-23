import type { SocialNetwork } from "../types"

type DevTreeLinkProps = {
  link: SocialNetwork,
  // handleRef: React.RefObject<any>,
  setElement: (el: Element | null) => void
  isDragging: boolean
}

// const DevTreeLink = ({ link, handleRef, isDragging, setElement }: DevTreeLinkProps) => {
const DevTreeLink = ({ link, isDragging, setElement }: DevTreeLinkProps) => {
  return (
    <li
      ref={setElement}
      data-shadow={isDragging || undefined}
      className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
    >
      <div
        className="w-12 h-12 bg-cover"
        style={{ backgroundImage: `url('/social/icon_${link.name}.svg')` }}
      ></div>

      <p className="capitalize">Visita mi: <span className="font-bold">{link.name}</span></p>

      {/* <button ref={handleRef} className="handle ml-auto">⠿</button> */}
    </li>
  )
}

export default DevTreeLink