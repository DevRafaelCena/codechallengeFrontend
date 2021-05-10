import React, {useEffect,useState} from 'react';
import api from '../api';
import Grid from '@material-ui/core/Grid';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ModalConfirm from './modalConfirm';
import { Button } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
         
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },

  }));
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  

function Tasks({ todos,updateTodos,todosCompleted, updateTodosCompleted}) {      
    const [atualiza, setAtualiza] = useState("");    
    const classes = useStyles();
 

  async function buscaTasks(){
        const buscaTasksPending = await api.get("listPendencias")   
        todos = []
        for(let i = 0; i < buscaTasksPending.data.length; i++){
            todos.push(buscaTasksPending.data[i])
        }         
        updateTodos(todos)  

        todosCompleted = []  
        const buscaTasks = await api.get("listFinalizadas")   
        for(let i = 0; i < buscaTasks.data.length; i++){
            todosCompleted.push(buscaTasks.data[i])
        } 
        updateTodosCompleted(todosCompleted)
                  
    }

    useEffect(()=>{
    buscaTasks()   
       
},[atualiza])


    const alteraStatus = async(e,task) => {
        e.preventDefault();  
        await api.put("update/"+ task.id,{status:task.status, alteracoes:task.alteracoes})
            
        setAtualiza(atualiza + 1)
    };  

    function setRegister(){         
        setAtualiza(atualiza+1)
    }

    const semTarefas = async(e) => {
        e.preventDefault();
        const novasTarefas = await api.get("https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=4")
   
        for(let i = 1; i < 4; i++){
            const data = {
                descricao : novasTarefas.data[i].text,
                email : "eu@me.com",
                responsavel : "EU"
            }
            await api.post("create",data)
        }
        setAtualiza(atualiza + 1)
    }
    return (        
          <div className={classes.root}>
                <Grid container spacing={3}>
                     <Grid item xs={12}>
                        <div id="pendentes">Tarefas pendentes</div>

                        <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="customized table">
                                        <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Descrição</StyledTableCell>
                                            <StyledTableCell >Responsavel</StyledTableCell>
                                            <StyledTableCell >Email</StyledTableCell>
                                            <StyledTableCell >Ações</StyledTableCell>
                                          
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {  todos.map((task) =>(       
                                            <StyledTableRow key={task.descricao}>
                                            <StyledTableCell component="th" scope="row">
                                                {task.descricao}
                                            </StyledTableCell>
                                            <StyledTableCell>{task.responsavel}</StyledTableCell>    
                                            <StyledTableCell>{task.email}</StyledTableCell>   
                                            <StyledTableCell> <Button variant="contained" color="secondary" onClick={e => alteraStatus(e,task)} className="btn-Concluir" >Concluir</Button></StyledTableCell>                                    
                                            </StyledTableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                    </TableContainer>         

                                    {todos.length <=0 ?
                                     <><p>Está sem tarefas? </p>
                                     
                                     <Button  onClick={e => semTarefas(e)} variant="contained" color="primary"  >Estou sem tarefas</Button> </>  : 
                                    
                                    
                                    
                                    "" }                  
                        </Grid>
                    <Grid item xs={12}>
                        <div id="concluidos">Tarefas concluídas</div>
                        <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="customized table">
                                        <TableHead>
                                        <TableRow>
                                            <StyledTableCell>Descrição</StyledTableCell>
                                            <StyledTableCell >Responsavel</StyledTableCell>
                                            <StyledTableCell >Email</StyledTableCell>
                                            <StyledTableCell >Ações</StyledTableCell>
                                          
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {  todosCompleted.map((tasks) =>(
                                            <StyledTableRow key={tasks.descricao}>
                                            <StyledTableCell component="th" scope="row">
                                                {tasks.descricao}
                                            </StyledTableCell>
                                            <StyledTableCell>{tasks.responsavel}</StyledTableCell>    
                                            <StyledTableCell>{tasks.email}</StyledTableCell>   
                                            <StyledTableCell>{tasks.alteracoes >=2 ? "Não é possivel alterar esta tarefa" : <ModalConfirm setRegister={setRegister} task={tasks} id={tasks.id} /> } </StyledTableCell>                                    
                                            </StyledTableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                    </TableContainer>
                 
                    </Grid>
                </Grid>
            </div>  
        
    );
};
export default Tasks;