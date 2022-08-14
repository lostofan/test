import { useEffect, useState } from "react";
import { StateType } from "../types/Modal.types";


export const useImage = (imageId: string | null) => {
    const [image, setImage] = useState<StateType>({});


    async function getImage(imageId: string | null) {
        if(!imageId) return;
        const promise = await fetch(`https://boiling-refuge-66454.herokuapp.com/images/${imageId}`);
        const response = await promise.json();
        setImage(response);
    }

    useEffect(() => {

        (async () => {
            if(imageId) {
                await getImage(imageId);
            }
        })()

        return () => {
            setImage({});
        }
    }, [imageId]);

    return {
        image
    }
}

export const useParseImages = () => {
    const [images, setImages] = useState([]);


    async function getImages() {
        const promise = await fetch("https://boiling-refuge-66454.herokuapp.com/images");
        const array = await promise.json();
        setImages(array);
    }

    useEffect(() => {

        (async () => {
            await getImages();
          })()

        return () => {
            setImages([]);
        }
    }, []);

    return {
        images
    }
}

export const useComment = () => {
    const [comment, setComment] = useState("");
    const handleText = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
        setComment(event.target.value);
    }

    async function postComment(imageId:string | null, comment: string | null, setComment: (value: string) => void) {
        await fetch(`https://boiling-refuge-66454.herokuapp.com/images/${imageId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
             },
            body: JSON.stringify({
                comment: comment,
                name: "Artem",
            })
        });
        setComment("");
}
    return {
        postComment,
        comment,
        setComment,
        handleText
    }
}