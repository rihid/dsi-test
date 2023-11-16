import React from 'react'
import Icon from './Icon'

function ButtonSort({handleClick}) {
  return (
    <button
        type="button"
        onClick={handleClick}
    >
        <Icon name="icon-sort" size={12} />
    </button>
  )
}

export default ButtonSort