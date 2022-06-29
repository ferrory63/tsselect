import React, { FC, useState } from 'react'

import { IContent } from '../../types/types'
import { ColorVariant } from '../tsselect/tsselect'
import './tsoption.css'

interface OptionProps {
    content: IContent

    value: IContent[]
    setValue: (setValue: IContent[]) => void
    onAddToValue: (content: IContent) => void
    multiselect: boolean
    SelectColor: ColorVariant
}

const Option: FC<OptionProps> = ({
    content,
    multiselect,
    SelectColor,
    setValue,
    onAddToValue,
}) => {
    const [isAdded, setIsAdded] = useState<Boolean>(false)
    const add = (content: IContent) => {
        if (multiselect) {
            onAddToValue(content)
            setIsAdded(!isAdded)
        } else if (!multiselect) {
            onAddToValue(content)
        }
    }

    return (
        <div
            onClick={() => add(content)}
            className={`option ${SelectColor} ${isAdded ? `added` : null}`}
        >
            {content.imageUrl ? (
                <img width={15} height={15} src={content.imageUrl} alt="" />
            ) : (
                <div
                    style={{
                        width: '15px',
                        height: '15px',
                    }}
                ></div>
            )}

            <p>{content.text}</p>
        </div>
    )
}

export default Option
