import React, {useEffect, useState} from 'react';
import './App.css';
import {MarkdownEditorClient} from "./proto/generated/src/proto/markdown_editor_pb_service";
import {ListFileRequest, FileNameRequest, SaveFileRequest, FileContent} from "./proto/generated/src/proto/markdown_editor_pb";
import FileList from "./components/FileList";
import AddFileForm from "./components/AddFileForm";
import {Button, Grid, Typography} from "@material-ui/core";
import TextAreaInput from "./components/TextAreaInput";
import ReactMarkdown from "react-markdown";
import {Simulate} from "react-dom/test-utils";

function App() {
  const client: MarkdownEditorClient = new MarkdownEditorClient('http://localhost:8080');
  const [fileNames, setFileNames] = useState<Array<string>>([]);
  const [addFileName, setAddFileName] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [chosenFile, setChosenFile] = useState<string | null>(null);
  const [reFetch, setRefetch] = useState(true);

  useEffect(() => {
    if(chosenFile !== null){
      let request = new FileNameRequest();
      request.setFilename(chosenFile.replace(".md", ""));
      let data = '';
      let stream = client.getFileContent(request);

      stream.on('data', (message => {
        data += message.getContent();
        data += "\n";
      }))

      stream.on('end', () => {
        setFileContent(data);
      })
    }
  }, [chosenFile])

  function saveFile(){
    let request = new SaveFileRequest();
    if(chosenFile === null){
      console.log("file not chosen!");
      return;
    }
    request.setFilename(chosenFile.replace(".md", ""));
    let content = new FileContent();
    content.setContent(fileContent);
    request.setContent(content);
    client.saveFile(request, (err, res) => {
      if(err){
        alert(err.message);
        return;
      }
      else if(!res?.getSuccessful()){
        alert(res?.getErrormsg());
        return;
      }
      else{
        alert("File saved successfully");
        setRefetch(prevState => !prevState);
      }
    });
  }

  useEffect(() => {
    client.listAllFiles(new ListFileRequest(), (err, res) => {
      if (err){
        alert(err);
      }
      else {
        setFileNames(res?.getNameList() ?? []);
      }
    })
  }, [reFetch])

  return (
    <div className="App">
      <Typography className={"title"} variant={"h2"} gutterBottom>Markdown Editor</Typography>
      <Grid container spacing={5}>
        <section className={"list-section"}>
          <FileList
              client={client}
              reFetch={setRefetch}
              fileNames={fileNames}
              onFileChosen={(fileName: string | null) => setChosenFile(fileName)}
          />
          <AddFileForm
              client={client}
              reFetch={setRefetch}
              fileName={addFileName}
              setFileName={setAddFileName}
          />
        </section>
        <section className={"input-section"}>
          {chosenFile === null ? <div>No file selected</div> : <><TextAreaInput
              value={fileContent}
              fileName={chosenFile}
              onInput={(e) => {setFileContent((e.target as HTMLTextAreaElement).value)}}
          />
          <Button
              onClick={saveFile}
              style={{marginTop: '5px'}}
              variant={"contained"}>Save
          </Button></>}
        </section>
        <section className={"markdown-section"}>
          <ReactMarkdown>
            {fileContent}
          </ReactMarkdown>
        </section>
      </Grid>
    </div>
  );
}

export default App;
