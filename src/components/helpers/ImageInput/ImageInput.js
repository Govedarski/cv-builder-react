import { useRef, useState } from 'react';
import defaultPlaceholder from "./placeholder.jpeg"

export function ImageInput({ data, setData, placeholder }) {
    placeholder = placeholder || defaultPlaceholder;
    const inputRef = useRef();

    const handleImageChange = (file) => {
        const reader = new FileReader();

        reader.onloadend = () => {
            const base64Encoded = reader.result.split(',')[1];
            const extension = file.type.split('/')[1];
            setData( { image: reader.result, binary:base64Encoded, extension });
        };

        reader.readAsDataURL(file);
    };

    function onClickHandler() {
        inputRef.current.click();
    }

    function onDropHandler(e) {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleImageChange(file);
    }

    function onDragOverHandler(e) {
        e.preventDefault();
        e.stopPropagation();
    }


    return (
        <>
            <img
                src={data?.image || placeholder}
                alt="chosen"
                style={{ cursor: 'pointer' }}
                onClick={onClickHandler}
                onDrop={onDropHandler}
                onDragOver={onDragOverHandler}
            />
            {data?.image && <span>Change image</span>}
            <input
                ref={inputRef}
                type="file"
                style={{ display: 'none' }}
                onChange={(e) => handleImageChange(e.target.files[0])}
                accept="image/*"
            />
        </>
    );
}
