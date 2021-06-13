import {TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {FormEventHandler} from "react";
import React from "react";

interface Props{
    fileName: string | null
    value: string
    onInput: FormEventHandler<HTMLDivElement>
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '90%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function TextAreaInput(props: Props){
    const classes = useStyles();

    return (
        <TextField
            className={classes.root}
            placeholder="Edit file"
            label={props.fileName}
            multiline
            value={props.value}
            rows={20}
            rowsMax={20}
            onInput={props.onInput}
        />
    )
}