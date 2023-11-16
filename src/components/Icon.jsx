import React from 'react'
import iconSort from './../assets/icons/icon-sort.svg'

function Icon({name, size}) {
    switch(name){
        case 'icon-sort':
			return <img src={iconSort} width={size} height={size} alt={name} />
			break;
		default:
			return <div>No icon found</div>
    }
}

export default Icon