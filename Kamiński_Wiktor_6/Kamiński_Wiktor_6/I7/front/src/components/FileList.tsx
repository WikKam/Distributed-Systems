import React, {MouseEventHandler} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {IconButton, ListItemSecondaryAction} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import {MarkdownEditorClient} from "../proto/generated/src/proto/markdown_editor_pb_service";
import {FileNameRequest} from "../proto/generated/src/proto/markdown_editor_pb";

interface Props {
    fileNames: Array<string>;
    onFileChosen: Function;
    client: MarkdownEditorClient
    reFetch: React.Dispatch<React.SetStateAction<boolean>>
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function SimpleList(props: Props) {
    const classes = useStyles();

    function onDelete(index: number){
        return (e: React.MouseEvent) => {
            let fileToDelete = props.fileNames[index].replace(".md", "");
            let request = new FileNameRequest();
            request.setFilename(fileToDelete);
            props.client.deleteFile(request, (err, res) => {
                if(err !== null){
                    alert(err.message);
                    return;
                }
                else if (!res?.getSuccessful()){
                    alert(res?.getErrormsg());
                    return;
                }
                else {
                    props.reFetch(prev => !prev);
                }
            })
        }
    }

    return (
        <div className={classes.root}>
            <List component="nav" aria-label="files">
                {props.fileNames.map((name, index) => (
                    <>
                        <ListItem
                            button
                            onClick={(e) => props.onFileChosen(props.fileNames[index])}
                        >
                            <ListItemText primary={name} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="delete" onClick={onDelete(index)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                        <Divider/>
                    </>
                ))}
            </List>
        </div>
    );
}
