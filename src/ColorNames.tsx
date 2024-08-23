import React from 'react'
import ColorNamesList from './ColorNamesList';
import colorData from './data/colors.json'

export interface Color {
    name: string,
    hex: string,
    rgb: string,
    families: string[]
}

export default function ColorNames() {
    const [colors, setColors] = React.useState<Color[]>([]);

    React.useEffect(() => {
        setColors(colorData);
    }, [])

    return (
        <div>
            <h1>HTML Color Names</h1>

            <ColorNamesList colors={colors} />
        </div>
    )
}