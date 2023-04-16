import {useRef} from 'react';
import defaultPlaceholder from './placeholder.jpeg';
import {CloseButton} from '../../CloseButton/CloseButton.js';
import styles from './ImageInput.module.css';

export function ImageInput({imageData, setImageData, imageUrl, placeholder, className, deleteImageHandler, style}) {
    placeholder = placeholder || defaultPlaceholder;
    const inputRef = useRef();

    const handleImageChange = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Encoded = reader.result.split(',')[1];
            const extension = file.type.split('/')[1];
            setImageData(reader.result, base64Encoded, extension);
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

    function onDelete() {
        inputRef.current.value = '';
        deleteImageHandler();
    }


    return (
        <div className={styles.imageContainer} style={style}>
            <img
                src={imageData?.image || imageUrl || placeholder}
                alt="chosen"
                className={className}
                style={{cursor: 'pointer'}}
                onClick={onClickHandler}
                onDrop={onDropHandler}
                onDragOver={onDragOverHandler}
            />
            <CloseButton
                title={'Delete image'}
                className={styles.deleteButton}
                onClick={onDelete}
            />
            <input
                ref={inputRef}
                type="file"
                style={{display: 'none'}}
                onChange={(e) => handleImageChange(e.target.files[0])}
                accept="image/*"
            />
        </div>
    );
}
