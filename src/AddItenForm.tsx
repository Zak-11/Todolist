import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import {AddBox} from "@material-ui/icons";
import {IconButton, TextField} from "@material-ui/core";

type AddItemFormPropsType = {
    addItem: (title: string) => void

}


const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    let [title, setTitle] = useState<string>("")
    let [error, setError] = useState<boolean>(true)

    const addItem = () => {
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

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(true)
        }
        if (e.key === "Enter") {
            addItem()
        }

    }


    return (
        <div>
            <TextField
                variant={"outlined"}
                error={!!error}
                value={title}
                onChange={onChangeItem}
                onKeyPress={onKeyPressAddItem}
                helperText={error && "Title is required!"}
                size={"small"}
                onBlur={() => setError(true)}/>

            <IconButton onClick={addItem}
                        color={"primary"}>
                <AddBox/>

            </IconButton>

        </div>

    )
})


export default AddItemForm
