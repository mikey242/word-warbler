const Notification = ({message, onClick}) => {

    return (
        <div onClick={onClick} className="absolute text-center right-0 translate-x-1/2 w-[200px] bg-blue-500 dark:bg-purple-900 text-white py-2 px-4 rounded">
            {message}
        </div>
    )
}

export {Notification}