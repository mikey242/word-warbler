import { Tile } from "./Tile"

const CurrentRow = ({letters = []}) => {    
    const blanks = letters.length < 5 ? Array.from(Array( 5 - letters.length)) : []
    const merged = [...letters, ...blanks]

    return (
        <div className="grid grid-cols-5 gap-2">
            {merged.map((item,i) => (
                <Tile
                    key={i}
                    letter={item}
                />
            ))}
        </div>
    )
}

export {CurrentRow}