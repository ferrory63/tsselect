import React, { FC, useRef, useState, useEffect } from 'react'
import { IContent } from '../../types/types'
import './tsselect.css'
import Option from '../tsoption/tsoption'

export enum ColorVariant {
    light = 'light',
    dark = 'dark',
}

interface SelectProps {
    content: IContent[]
    prompt: string
    value: IContent[]
    setValue: (setValue: IContent[]) => void
    multiselect: boolean
    SelectColor: ColorVariant
    width: number
}

const Select: FC<SelectProps> = ({
    prompt,
    multiselect,
    SelectColor,
    content,
    width,
    value,
    setValue,
}) => {
    const [isopen, setIsOpen] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<string>('')
    const ref = useRef<any>(null)

    useEffect(() => {
        let close = (event: MouseEvent) => {
            if (!ref.current?.contains(event.target)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('click', close)
        return () => {
            document.removeEventListener('click', close)
        }
    }, [])

    const onChangeSearchInput = (event: React.ChangeEvent) => {
        setSearchValue((event.target as HTMLInputElement).value)
    }

    const onAddToValue = (content: IContent) => {
        if (multiselect) {
            if (value.find((item) => Number(content.id) === Number(item.id))) {
                setValue([
                    ...value.filter(
                        (item) => Number(content.id) !== Number(item.id)
                    ),
                ])
            } else {
                setValue([...value, content])
            }
        } else if (!multiselect) {
            setValue([content])
            setIsOpen(!isopen)
        }
    }

    return (
        <div style={{ width: width }}>
            <div ref={ref} className={`select ${SelectColor} `}>
                <div className={`control ${SelectColor}`}>
                    <div className="selected-value">{prompt}</div>
                    <div
                        onClick={() => setIsOpen(!isopen)}
                        className={`arrow ${isopen ? 'open' : null}`}
                    />
                </div>
                <div
                    className={`options ${
                        isopen ? 'open' : null
                    } ${SelectColor}`}
                >
                    <div className={`search ${SelectColor}`}>
                        {isopen ? (
                            <input
                                className={`search-block `}
                                value={searchValue}
                                onChange={onChangeSearchInput}
                                placeholder="Search..."
                                type="text"
                            />
                        ) : (
                            prompt
                        )}
                        {content
                            .filter((obj) =>
                                obj.text
                                    .toLowerCase()
                                    .includes(searchValue.toLowerCase())
                            )
                            .map((obj) => (
                                <Option
                                    key={obj.id}
                                    value={value}
                                    setValue={setValue}
                                    content={obj}
                                    //key={obj.id}
                                    onAddToValue={onAddToValue}
                                    SelectColor={SelectColor}
                                    multiselect={multiselect}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Select
