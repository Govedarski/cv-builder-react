import {useState} from 'react';

export function useImageData() {
    const [imageData, setImage] = useState({
        image:"",
        binary:"",
        extension:""
    })
    function setImageData(image, binary, extension) {
        setImage({image, binary, extension})
    }

    return [imageData, setImageData]
}