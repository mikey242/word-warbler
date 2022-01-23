import classNames from 'classnames'
import { useEffect, useState } from 'react'

const Tile = ({letter, status, selected}) => {

    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        if(letter && status === undefined) {
            setAnimate(true)
            setTimeout(() => {
                setAnimate(false)
            }, 200)
        }
    }, [letter, status])

    return (
        <div className={
            classNames(
                status === 0 && 'bg-gray-300',
                status === 1 && "bg-orange-400",
                status === 2 && "bg-green-400",
                selected && "ring ring-cyan-600",
                animate && "animate-press",
                "relative border border-gray-300 border-solid pt-[100%] w-full h-full shadow-md"
            )}>
            <div className="absolute inset-1/2 flex justify-center items-center">
                <p className='font-bold text-sm sm:text-xl'>{letter}</p>
            </div>
        </div>
    )
}

export {Tile}