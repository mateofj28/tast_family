import { forwardRef, useEffect, useState } from 'react'
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "primereact/resources/primereact.css";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import reactLogo from './assets/react.svg'
import './App.css'
import { DataTable } from 'primereact/datatable';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Column } from 'primereact/column';
import { TastService } from './service/tastService'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Slide, TextField } from '@mui/material';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {
  const [tast, setTast] = useState([])
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const serviceTast = new TastService()
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isSign, setIsSign] = useState(false);


  const getTast = async () => {
    const res = await serviceTast.getTast()
    setTast(res.data.data)
  }

  useEffect(() => {
    getTast()
  }, [])

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false)
  };

  const addTast = async () => {
    if (name === "" || desc === "") {
      console.log("algo salio mal al intentar crear la tarea");
    } else {

      const tast = {
        name: name,
        des: desc,
        state: false
      }
      const res = await serviceTast.postTast(tast)
      console.log(res);
      if (res.status === 200) {
        setName("")
        setDesc("")
        setOpen(false)
        getTast()
      }
    }
  }

  const sigin = async () => {
    if (email === "" || password === "") {
      console.log("algo salio mal al intentar iniciar sesión");
    } else {

      const tast = {
        email: email,
        password: password,
      }

      const res = await serviceTast.sigin(tast)
      console.log(res);
      if (res.status === 200) {
        setEmail("")
        setPassword("")
        setOpenModal(false)
        setIsSign(true)
      }
    }
  }

  const handelRemove = async (id) => {
    const res = await serviceTast.removeTast(id)
    console.log(res)
    if (res.status === 200) {
      getTast()
    }
  }

  const handelUpdate = async (data) => {
    const newData = {
      state: true
    }

    const res = await serviceTast.putTast(data._id, newData)
    console.log(res)
    if (res.status === 200) {
      getTast()
    }

  }


  const statusBodyTemplate = (rowData) => {
    return <span className={rowData.state ? "badge-accept" : "badge-incomplete"}>{rowData.state ? 'Realizado' : 'Incompleta'}</span>;
  }

  const actionsBodyTemplate = (rowData) => {

    return (
      <>
        <div className='flex'>
          <IconButton aria-label="delete" onClick={() => handelRemove(rowData._id)} >
            <DeleteIcon />
          </IconButton>
          {rowData.state === false && (
            <IconButton aria-label="check" onClick={() => handelUpdate(rowData)}>
              <CheckIcon />
            </IconButton>
          )}
        </div>
      </>
    )
  }


  return (
    <div>
      <div className='flex justify-content-start'>
        <IconButton aria-label="delete" onClick={() => {
          isSign? setIsSign(false): setOpenModal(true)
        }}>
          { isSign?  <LoginIcon style={{ 'color': '#fffffe' }} /> : <AccountCircleIcon style={{ 'color': '#fffffe' }} /> }
        </IconButton>
      </div>
      <h1>Lista de Tareas</h1>
      <div className='flex justify-content-center'>
        <div className="col-8">
          <DataTable value={tast} responsiveLayout="scroll" paginator rows={10} rowsPerPageOptions={[10, 20, 50]}>
            <Column field="name" header="Nombre"></Column>
            <Column field="des" header="Descripción"></Column>
            <Column body={statusBodyTemplate} header="Estado"></Column>
            <Column body={actionsBodyTemplate} header="Acciones"></Column>
          </DataTable>
          {isSign === true && (
            <div className='flex justify-content-between'>
              <p>Agrega mas tareas a medida que vayan surgiendo nuevas responsabilidades:</p>
              <Button variant="contained" className='pl-4 pr-4 mt-3 h-2rem' onClick={() => setOpen(true)}>Agregar</Button>
            </div>
          )}

        </div>
      </div>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Registrar nueva tarea"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Añade mas tareas a tu familia.
          </DialogContentText>
          <TextField id="outlined-basic" label="Nombre" value={name} onChange={(e) => setName(e.target.value)} variant="outlined" className='m-3' />
          <TextField id="outlined-basic" label="Descripción" variant="outlined" value={desc} onChange={(e) => setDesc(e.target.value)} className='m-3' />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
          <Button onClick={addTast}>Agregar</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseModal}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"INICIAR SESIÓN"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Accede a tu cuenta para agregar tareas.
          </DialogContentText>
          <TextField id="outlined-basic" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} variant="outlined" className='m-3' />
          <TextField id="outlined-basic" label="password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} className='m-3' />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cerrar</Button>
          <Button onClick={sigin}>Iniciar sesión</Button>
        </DialogActions>
      </Dialog>

    </div>
  )
}

export default App


