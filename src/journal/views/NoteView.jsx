import { DeleteOutline, Message, SaveOutlined, UploadFileOutlined } from "@mui/icons-material";
import { Button, Grid, TextField, Typography, IconButton } from "@mui/material";
import { ImageGallery } from "../components";
import { useForm } from "../../hooks/useForm";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { setActiveNote, startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal";
import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {

  const dispatch = useDispatch();
  const { active:note, messageSaved, isSaving } = useSelector((state) => state.journal);

  const { body, title, onInputChange, formState, date } = useForm(note);

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const fileInputRef = useRef();

  useEffect(() => {
    dispatch(setActiveNote(formState));
  }, [formState]);

  useEffect(() => {
    if(messageSaved.length > 0){
      Swal.fire('Nota actualizada', messageSaved, 'success');
    }
  }, [messageSaved])
  

  const onSaveNote = () => {
    dispatch(startSaveNote())
  }

  const onFileInputChange = ({target}) => {
    if(target.files === 0) return;

    dispatch(startUploadingFiles(target.files));
  }

  const onDelete = () => {
    dispatch(startDeletingNote());
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight="light">
          {dateString}
        </Typography>
      </Grid>
      <Grid item>

        <input
          type="file"
          multiple
          ref={fileInputRef}
          onChange={onFileInputChange}
          style={{display:'none'}}
        />

        <IconButton color="primary" disabled={isSaving} onClick={() => fileInputRef.current.click()}>
          <UploadFileOutlined />
        </IconButton>

        <Button disable={isSaving} onClick={onSaveNote} color="primary" sx={{ padding: 2 }}>
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      <Grid container>
        <TextField
          type="text"
          variant="filled"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          sx={{ border: "none", mb: 1 }}
          name="title"
          value={title}
          onChange={onInputChange}
        />

        <TextField
          type="text"
          variant="filled"
          fullWidth
          multiline
          placeholder="¿Qué sucedió en el día de hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
        />
      </Grid>

      <Grid
        container
        justifyContent='end'
      >
        <Button onClick={onDelete} sx={{mt:2}} color='error'>
          <DeleteOutline />
        </Button>
      </Grid>

      {/* Image gallery */}
      <ImageGallery images={note.imageUrls}/>
    </Grid>
  );
};