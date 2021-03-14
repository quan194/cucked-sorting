import React from 'react'

function Bar({height, colorKey}) {
    const colorSet = ['grey', 'orange', 'green'];
    let style = {
        height: height,
        backgroundColor: colorSet[colorKey],
    }
    return (
        <div className="bar" style={style}>
            <p>hi</p>
        </div>
    )
}

export default Bar
