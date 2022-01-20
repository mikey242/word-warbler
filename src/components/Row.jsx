import { Tile } from "./Tile"

const Row = ({letters = []}) => {

    return (
        <div className="grid grid-cols-5 gap-3">
            <Tile>{letters[0]}</Tile>
            <Tile>{letters[1]}</Tile>
            <Tile>{letters[2]}</Tile>
            <Tile>{letters[3]}</Tile>
            <Tile>{letters[4]}</Tile>
        </div>
    )
}

export {Row}