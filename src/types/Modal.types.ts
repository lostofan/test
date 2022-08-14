export type ModalProps = {
    closeModal:boolean;
    setCloseModal: (value: boolean) => void;
}


export type StateType = {
    id?: number; 
    url?: string;
    comments?: {text?: string;}[];
}