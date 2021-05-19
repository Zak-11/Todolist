import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {AddBox} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void

}


function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)


    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onClickAddItem()
        }
    }

    const onClickAddItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)

        } else {
            setError(true)
        }
        setTitle("")

    }
    const onChangeItem = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    /*const errorMessage = error
        ? <div style={{color: "error-message"}}>Title is required! </div>
        : nul*/

    return (
        <div>
            <TextField
                variant={"outlined"}
                error={error}
                value={title}
                onChange={onChangeItem}
                onKeyPress={onKeyPressAddItem}
                helperText={ error && "Title is required!"}
                size={"small"}
                onBlur={() => setError(false)}
            />
            {/*<input className={error ? "error" : ""}
                   value={title}
                   onChange={onChangeItem}
                   onKeyPress={onKeyPressAddItem}
            />*/}
            {/* <button onClick={onClickAddItem}>+</button>*/}
            <IconButton onClick={onClickAddItem}
                        color={"primary"}>
                <AddBox/>

            </IconButton>
         {/*   {errorMessage}*/}
        </div>

    )
}


export default AddItemForm
