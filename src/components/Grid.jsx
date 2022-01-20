import { Row } from "./Row"

const Grid = ({current, guesses}) => {

    const combined = [...guesses, [...current]]

    return (
        <div className="grid grid-rows-4 gap-3">
            <Row letters={combined[0]}/>
            <Row letters={combined[1]}/>
            <Row letters={combined[2]}/>
            <Row letters={combined[3]}/>
            <Row letters={combined[4]}/>
            <Row letters={combined[5]}/>
        </div>
    )
}

export {Grid}