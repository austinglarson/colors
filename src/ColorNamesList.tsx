import React from 'react'
import { Color } from './App'

function ColorName({ name, hex, rgb }: Color) {
    const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);

    function openColorDetails() {
        setIsDetailsOpen((prevState: boolean) => !prevState);
    };

    return (
        <div>
            <button className="color-top" onClick={openColorDetails}>
                <div className="color-square" style={{backgroundColor: hex}}></div>
                <span>{name.toLowerCase()}</span>
            </button>

            {isDetailsOpen && (
                <div className="color-details">
                    <span>{hex}</span>
                    <span>{rgb.toLowerCase()}</span>
                    <input type="color" defaultValue={hex}></input>
                </div>
            )}
        </div>
    )
}

export default function ColorNamesList({ colors }: {colors: Color[]}) {
    const [colorItems, setColorItems] = React.useState<Color[]>(colors);
    const [colorSearch, setColorSearch] = React.useState('');

    React.useEffect(() => {
        setColorItems(colors);
    }, [colors]);

    React.useEffect(() => {
        const colorData = colors;

        setColorItems(
            colorData.filter((value: Color) =>
                value.families.includes(colorSearch.toLowerCase()) ||
                value.name.includes(colorSearch.toUpperCase())
            )
        )
    }, [colorSearch])

    function searchColors(event: React.ChangeEvent<HTMLInputElement>) {
        setColorSearch(event.target.value);
    }

    return (
        <div>
            <input type="text" value={colorSearch} onChange={searchColors} placeholder="Search by color name or keywords (red, light, etc...)" />
            <div className="color-names-list">
                {colorItems.map(color =>
                    <ColorName key={color.name.toLowerCase()} {...color} /> 
                )}
            </div>
        </div>
    )
}