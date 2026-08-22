export function ColorPicker({ onSetStyle, selectedColor }) {
    const colors = [
        '#ffffff',
        '#FAAFA8',
        '#F39F76',
        '#FFF8B8',
        '#E2F6D3',
        '#B4DDD3',
        '#D4E4ED',
        '#AECCDC',
        '#D3BFDB',
        '#F6E2DD',
        '#E9E3D4',
        '#EFEFF1',
    ]

    return <div className="color-picker">
        {colors.map(color =>
            <div
                key={color}
                style={{ backgroundColor: color }}
                onClick={() => onSetStyle({ backgroundColor: color })}
                className={
                    color === selectedColor ? 'color-block selected' : 'color-block'
                }
            ></div>)}
    </div>
}