import React ,{useState}  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import api from '../api';
function getModalStyle() {
  const top = 50 
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
   transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  cancelarModal:{
      marginLeft: "10px",
  },
  botao:{
      marginLeft: '10px',
  }
}));

export default function SimpleModal(props) {
  const classes = useStyles();
 
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [key, setKey] = useState()

 async function handleSubmit(event){
    event.preventDefault();

    if(key ===''){
        alert("preencha a senha")
    }else{

        const status = await api.put("update/" + props.id,{key:key,status: props.task.status,alteracoes:props.task.alteracoes})
        
        console.log(status)
        if(status.data.msg){
            handleClose()
            setKey("")
            return alert(status.data.msg)
            
        }
        props.setRegister() 
        setKey("")
        handleClose()
    }
}
   
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Alterando status para pendente</h2>
      <form className={classes.root} noValidate autoComplete="off">
  <p>Insira a senha de supervisor</p>
  <TextField
       id="outlined-basic"
       fullWidth
       type="password"
       label="Digite a senha"
       variant="outlined"
       value={key}
       onChange={e => setKey(e.target.value)}
     />
<p></p>

</form>
<Button  variant="contained" onClick={e => handleSubmit(e)} color="primary" type="submit">
 Confirmar
</Button>
<Button className={classes.cancelarModal} type="button" id="cancelar" variant="contained" color="secondary" onClick={handleClose}>
 Cancelar
</Button>
     
    </div>
  );

  return (
    <div>
        <Button className={classes.botao} type="button" variant="contained" color="secondary" onClick={handleOpen}>
Reativar
</Button>
     
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
