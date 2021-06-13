import React, {FormEvent, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import {Button} from "@material-ui/core";
import {MarkdownEditorClient} from "../proto/generated/src/proto/markdown_editor_pb_service";
import {FileNameRequest} from "../proto/generated/src/proto/markdown_editor_pb";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

interface Props{
    fileName: string | null,
    setFileName: React.Dispatch<React.SetStateAction<string | null>>
    reFetch: React.Dispatch<React.SetStateAction<boolean>>
    client: MarkdownEditorClient
}

export default function AddFileForm(props: Props){
    const [currentName, setCurrentName] = useState<string | null>(props.fileName);
    const classes = useStyles();

    function onSubmit(e: FormEvent) {
        e.preventDefault();
        if(currentName === null){
            alert("Name is not filled!");
            return;
        }
        let request = new FileNameRequest();
        request.setFilename(currentName)
        props.client.createFile(request, (err, res) => {
            if(err !== null){
                alert(err.message);
                return;
            }
            else if(!res?.getSuccessful()){
                alert(res?.getErrormsg());
                return;
            }
            else{
                props.reFetch(prev => !prev);
            }
        })
    }

    return(
        <form className={classes.root} onSubmit={onSubmit}>
            <TextField
                type={"text"}
                placeholder={"File name"}
                value={props.fileName}
                onInput={(e) => setCurrentName((e.target as HTMLTextAreaElement).value)}
            />
            <Button variant={"contained"} type={"submit"}>Add</Button>
        </form>
    )
}