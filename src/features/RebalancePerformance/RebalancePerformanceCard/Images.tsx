import Image from "next/image"

const Img = ({key, src, width, height} : {key: number, src: string, width: number, height: number}) => {
  return (
    <Image alt="logo" key={key} src={src} objectFit='cover' width={width} height={height} />
  )
}

export default Img