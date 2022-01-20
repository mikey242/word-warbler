import classNames from 'classnames'

const Tile = ({children = ""}) => {

    return (
        <div className={
            classNames(
                children.correct === 0 ? 'bg-gray-300' :
                children.correct === 1 ? "bg-orange-400" :
                children.correct === 2 ? "bg-green-400" : "" ,
                "relative border border-gray-300 border-solid pt-[100%] w-full h-full shadow-md rounded"
            )}>
            <div className="absolute inset-1/2 flex justify-center items-center">
                <p className='font-bold text-sm sm:text-xl'>{children.letter}</p>
            </div>
        </div>
    )
}

export {Tile}