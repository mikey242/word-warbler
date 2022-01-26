import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { TIMING } from '../../constants/settings'

const Tile = ({letter, status}) => {

    const [animate, setAnimate] = useState(false)

    useEffect(() => {
        if(letter && status === undefined) {
            setAnimate(true)
            const timer = setTimeout(() => {
                setAnimate(false)
            }, (TIMING * 100))
            return () => clearTimeout(timer)
        }
    }, [letter, status])

    return (
        <div className={
            classNames(
                status ? "text-gray-800 dark:text-gray-700" : "text-gray-600 dark:text-gray-300",
                status === 0 && 'bg-gray-300 dark:bg-gray-500',
                status === 1 && "bg-orange-400",
                status === 2 && "bg-green-400",
                animate && "animate-press",
                "relative border border-gray-300 dark:border-gray-400 border-solid pt-[100%] w-full h-full shadow"
            )}>
            <div className="absolute inset-1/2 flex justify-center items-center">
                <p className='font-bold text-2xl'>{letter}</p>
            </div>
        </div>
    )
}

export {Tile}