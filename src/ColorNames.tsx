import React from 'react'
import ColorNamesList from './ColorNamesList';
import colorData from './data/colors.json'
import { Color } from './App'
import './ColorNames.scss'

export default function ColorNames() {
    const [colors, setColors] = React.useState<Color[]>([]);

    React.useEffect(() => {
        setColors(colorData);
    }, [])

    /* const colorCounts = {};
    for (let color of colorData) {
        for (let family of color.families) {
            if (typeof colorCounts[family] !== 'undefined') {
                colorCounts[family] += 1;
            } else {
                colorCounts[family] = 1;
            }
        }
    }
    console.log(colorCounts); */

    return (
        <div id="colorNames">
            <h1>HTML Color Names</h1>

            <ColorNamesList colors={colors} />
        </div>
    )
}