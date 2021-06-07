import {IMarkdownEditorServer} from '../proto/markdown_editor_grpc_pb';
import fs from 'fs/promises';
import * as fsSync from 'fs';
import {OperationResultUtil} from "./util";
import readline from 'readline';

import {
    FileContent,
    FileNameRequest,
    FilesList,
    ListFileRequest,
    OperationResult,
    SaveFileRequest
} from "../proto/markdown_editor_pb";
import {sendUnaryData, ServerUnaryCall, ServerWritableStream} from "grpc";


export class MarkdownEditorServer implements IMarkdownEditorServer{

    private static getPath(filename: String): string{
        return `./files/${filename}.md`;
    }

    createFile(call: ServerUnaryCall<FileNameRequest>, callback: sendUnaryData<OperationResult>): void {
        let path = MarkdownEditorServer.getPath(call.request.getFilename());
        if(fsSync.existsSync(path)){
            let response = OperationResultUtil.createUnSuccessful("File already exists");
            callback(null, response);
            return;
        }

        fs.open(path, 'w')
            .then(r => {
                let response = OperationResultUtil.createSuccessful();
                callback(null, response);
                r.close();
            })
            .catch(err => {
                let response = OperationResultUtil.createUnSuccessful(err.message);
                console.log(err);
                callback(null, response);
            })
    }

    deleteFile(call: ServerUnaryCall<FileNameRequest>, callback: sendUnaryData<OperationResult>): void {
        let path = MarkdownEditorServer.getPath(call.request.getFilename());
        if(!fsSync.existsSync(path)){
            let response = OperationResultUtil.createUnSuccessful("File doesnt exist");
            callback(null, response);
            return;
        }
        fs.unlink(path)
            .then(r => {
                let response = OperationResultUtil.createSuccessful();
                callback(null, response);
            })
            .catch(err => {
                let response = OperationResultUtil.createUnSuccessful(err.message);
                console.log(err);
                callback(null, response);
            })
    }

    getFileContent(call: ServerWritableStream<FileNameRequest>): void {
        let path = MarkdownEditorServer.getPath(call.request.getFilename());
        let readInterface = readline.createInterface({
            input: fsSync.createReadStream(path),
        })

        readInterface.on('line', (line) => {
            console.log(line);
            let response = new FileContent();
            response.setContent(line);
            call.write(response);
        })

        readInterface.on('close', () => {
            call.end();
        })
    }

    listAllFiles(call: ServerUnaryCall<ListFileRequest>, callback: sendUnaryData<FilesList>): void {
        fs.readdir('./files')
            .then(names => {
                let response = new FilesList();
                response.setNameList(names);
                callback(null, response);
            })
            .catch(err => {
                let response = new FilesList();
                callback(null, response);
            })
    }

    saveFile(call: ServerUnaryCall<SaveFileRequest>, callback: sendUnaryData<OperationResult>): void {
        let path = MarkdownEditorServer.getPath(call.request.getFilename());
        fs.writeFile(path, call.request.getContent()?.getContent() ?? '')
            .then(res => {
                let response = OperationResultUtil.createSuccessful();
                callback(null, response);
            })
            .catch(err => {
                let response = OperationResultUtil.createUnSuccessful("error while saving file");
                callback(null, response);
            })
    }
}