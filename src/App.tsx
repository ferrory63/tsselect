import React, { useState } from 'react'
import Select, { ColorVariant } from './components/tsselect/tsselect'
import { IContent } from './types/types'

const App = () => {
    const content: IContent[] = [
        { id: 1, text: 'Сергей', imageUrl: '/icons/photo.svg' },
        { id: 2, text: 'Иван', imageUrl: '' },
        { id: 3, text: 'Геннадий', imageUrl: '' },
    ]

    const [value, setValue] = useState<IContent[]>([])

    return (
        <Select
            prompt="select smth..."
            multiselect={true}
            setValue={setValue}
            SelectColor={ColorVariant.dark}
            content={content}
            value={value}
            width={200}
        />
    )
}

export default App
