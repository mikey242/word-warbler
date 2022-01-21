import classNames from 'classnames'

const Key = ({character, status, onClick}) => {

    return (
        <div data-character={character} onClick={() => onClick(character)} className={
            classNames(
                status === 0 && 'bg-gray-300',
                status === 1 && "bg-orange-400",
                status === 2 && "bg-green-400",
                "flex flex-auto items-center justify-center cursor-pointer text-white border bg-gray-900 h-10 shadow-md rounded-md"
            )}>
                <p className='select-none font-bold uppercase text-sm sm:text-xl'>{character}</p>
        </div>
    )
}

export {Key}