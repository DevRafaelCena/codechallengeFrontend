import React, {useEffect,useState} from 'react';
import apiEmail from '../apiEmail';
import api from '../api';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));
function FormTodo({ updateTodos}) {
    const [descricao, setDescricao] = useState("");
    const [email, setEmail] = useState("");
    const [responsavel, setResponsavel] = useState("");
    const [atualiza, setAtualiza] = useState(['']);
    const classes = useStyles();

    const buscaTodos = async () => {
        const busca = await api.get("listPendencias")
        let dados = [] 
        for(let i = 0; i < busca.data.length; i++){
            dados.push(busca.data[i])
        } 
        updateTodos(dados)
       
    }
    useEffect(()=>{
    buscaTodos()
},[atualiza])


    const handleSubmit = async(e) => {
        e.preventDefault();

        if(descricao ===""||email ==="" || responsavel ===""){
            return alert("Preencha todos os campos")
        }
         const validaEmail = await apiEmail.get(email)     
        if(!validaEmail.data.format_valid){
        return alert("email invalido " +validaEmail.data.did_you_mean )
        }   

        const data = {
            descricao,
            email,
            responsavel
        }
        const postTask = await api.post("create",data)
        if(postTask.data.msg){
            setDescricao("")
            setEmail("")
            setResponsavel("")
            setAtualiza(atualiza + 1)
        
            return //alert(postTask.data.msg)

        }else{
            //setAtualiza(atualiza + 1)
            return alert("Erro ao incluir tente novamente")
        }


      
      
    };  

    return (
        <>  

        <p>Nova Tarefa</p>   

        <form className={classes.root} noValidate autoComplete="off">      
      <TextField
       id="outlined-basic"
       label="Descrição da tarefa"
       variant="outlined"
       value={descricao}
       onChange={e => setDescricao(e.target.value)}
     />
       <TextField
       id="outlined-basic"
       label="Email do responsavel"
       variant="outlined"
       value={email}
       onChange={e => setEmail(e.target.value)}
     />
       <TextField
       id="outlined-basic"
       label="Responsavel pela tarefa"
       variant="outlined"
       value={responsavel}
       onChange={e => setResponsavel(e.target.value)}
     />
     <Button onClick={e => handleSubmit(e)} className="btn-salvar" variant="contained">Registrar tarefa</Button>
    </form> 
        </>
    );
};
export default FormTodo;