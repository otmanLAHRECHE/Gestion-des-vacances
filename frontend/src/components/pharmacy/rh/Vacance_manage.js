import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { DataGrid, GridToolbar, GridActionsCellItem,GridToolbarContainer,GridToolbarFilterButton,} from '@mui/x-data-grid';
import dayjs from 'dayjs';
import FormControl from '@mui/material/FormControl';

import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';

import InputLabel from '@mui/material/InputLabel';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import IconButton from '@mui/material/IconButton';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeleteIcon from '@mui/icons-material/Delete';
import EditAttributesIcon from '@mui/icons-material/EditAttributes';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Autocomplete from '@mui/material/Autocomplete';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Typography from '@mui/material/Typography';

import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';

import Container from '@mui/material/Container';

import Alt from '../../layouts/alert';

import { addNewVacance,getAllVacancesOfYear,deleteVacance, restartVacance } from '../../../actions/vacance_data';
import { getAllPersonsNames } from '../../../actions/pers_data';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const columns = [
    { field: 'id', headerName: 'Id', width: 60, hide: true },
    { field: 'person', headerName: 'العامل', flex: 1, resizable: true,width: 180, valueGetter: (params) =>
    `${params.row.person.full_name || ''}` },
    { field: 'service', headerName: 'المصلحة', flex: 0.9, resizable: true,width: 180, valueGetter: (params) =>
    `${params.row.person.service.name || ''}` },
    { field: 'date_start', headerName: 'تاريخ بداية العطلة', flex: 0.9, resizable: true,width: 140 },
    { field: 'date_ends', headerName: 'تاريخ  نهاية العطلة', flex: 0.9,width: 140 },
    { field: 'date_restart', headerName: 'تاريخ  الإستئناف ', flex: 0.9,width: 140 },
    { field: 'vacance_type', headerName: 'نوع العطلة ', flex: 0.9,width: 140 },
    { field: 'days_taken', headerName: 'عدد أيام العطلة', flex: 0.9,width: 140 },
    { field: 'days_remains', headerName: 'عدد الأيام المتبقية', width: 140, valueGetter: (params) => {
      const restart = params.row.date_restart;
      if (!restart) return null;
      const today = dayjs().startOf('day');
      const restartDay = dayjs(restart).startOf('day');
      const diff = restartDay.diff(today, 'day'); 
      return diff >= 0 ? diff : 0;
    },sortComparator: (v1, v2) => (v1 ?? 0) - (v2 ?? 0) },
  ];


  

  export default function Vacance_inf(){


    const getRowClassName = (params) => {
    const restart = params.row.date_restart;
    if (!restart) return '';
    const diff = dayjs(restart).diff(dayjs(), 'day');
    if (diff <= 0) return 'row-red';         // 0 or past -> red
    if (diff >= 1 && diff <= 5) return 'row-yellow'; // 1..5 -> yellow
    return '';                                // otherwise no class
  };

    const [person, setPerson] = React.useState("");
    const [type, setType] = React.useState("");
    const [date_start, setDate_start] = React.useState("");
    const [date_end, setDate_end] = React.useState("");
    const [date_restart, setDate_restart] = React.useState("");
    const [dateFilter, setDateFilter] = React.useState(dayjs());

    const [days_taken, setDays_taken] = React.useState("");
    const [days_remains, setDays_remains] = React.useState("");


    const [dateFilterNotErr, setDateFilterNotErr] = React.useState(false);
    
    const [days_takenError, setDays_takenError] = React.useState("");
    const [days_remainsError, setDays_remainsError] = React.useState("");
    const [personError, setPersonError] = React.useState("");
    const [typeError, setTypeError] = React.useState("");
    const [date_startError, setDate_startError] = React.useState("");
    const [date_endError, setDate_endError] = React.useState("");
    const [date_restartError, setDate_restartError] = React.useState("");
    
    const [dateFilterError, setDateFilterError] = React.useState("");

    const [loadError, setLoadError ] = React.useState(false);
    const [loadTwoError, setLoadTwoError ] = React.useState(false);
    const [response, setResponse] = React.useState("");
    const [responseSuccesSignal, setResponseSuccesSignal] = React.useState(false);
    const [responseErrorSignal, setResponseErrorSignal] = React.useState(false);
    const [loaError, setLoaError ] = React.useState(false);

    const [allPersons, setAllPersons] = React.useState([]);
    const [allTypes, setAllTypes] = React.useState([]);

    const [currentStockItem, setCurrentStockItem] = React.useState([]);
    const [data, setData] = React.useState([]);
    const [personsData, setPersonsData] = React.useState([]);
    const [typesData, setTypesData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openUpdate, setOpenUpdate] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [selectionModel, setSelectionModel] = React.useState([]);
    const [selectionError, setSelectionError] = React.useState(false);
    const [selectionModelItems, setSelectionModelItems] = React.useState([]);
    const [rowData, setRowData] = React.useState("");
    const [dataError, setDataError] = React.useState(false);

    const [date_real_restart, setDate_real_restart] = React.useState("");
    const [date_real_restartError, setDate_real_restartError] = React.useState("");

    const [selectedRow, setSelectedRow] = React.useState(null);

    const theme = useTheme

      function Copyright(props) {
          return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
              {'Copyright © '}
              <Link color="inherit" href="https://github.com/otmanLAHRECHE">
                EPSP Djanet V3.0 
              </Link>{' '}
              -- created by otman LAHRECHE
              {'.'}
            </Typography>
          );
        }

        const addBonSortieOpen = async () =>{

          setType("");
          setPerson(null);
          setDays_taken("");
          setDate_start("");
          setDate_end("");
          setDate_restart("");

          setPersonError([false, ""]);
          setDate_startError([false, ""]);
          setDate_endError([false, ""]);
          setDate_restartError([false, ""]);
          setDays_takenError([false, ""]);
          setTypeError([false, ""]);

          const token = localStorage.getItem("auth_token");

          setPersonsData(await getAllPersonsNames(token));

        };

        const addBonSortieClose = () =>{
          setOpen(false);
        }

        const handleChangeDateStart = (newValue) =>{
          setDate_start(newValue);

        }

        const handleChangeDateEnd = (newValue) =>{
          setDate_end(newValue);

        }

        const handleChangeDateRestart = (newValue) =>{
          setDate_restart(newValue);

        }

        const handleChangeFilterDate = (newValue) =>{
          setDateFilter(newValue);

        }

        const addBonSortieSave = async () =>{
          var test = true;

          setPersonError([false, ""]);
          setDate_startError([false, ""]);
          setDate_endError([false, ""]);
          setDate_restartError([false, ""]);
          setDays_takenError([false, ""]);
          setTypeError([false, ""]);

          if (days_taken == "" || days_taken == 0){
            test = false;
            setDays_takenError([true, "champ est obligatoire"]);
          }

          if(person == null || person == ""){
            test = false;
            setPersonError([true, "champ est obligatoire"]);
          }

          if(date_start == null || date_start == ""){
            test = false;
            setDate_startError([true, "champ est obligatoire"]);
          }else if(date_start.isValid() == false){
            test = false;
            setDate_startError([true, "date n est pas valide"]);
          }

          if(date_restart == null || date_restart == ""){
            test = false;
            setDate_restartError([true, "champ est obligatoire"]);
          }else if(date_restart.isValid() == false){
            test = false;
            setDate_restartError([true, "date n est pas valide"]);
          }

          if(date_end == null || date_end == ""){
            test = false;
            setDate_endError([true, "champ est obligatoire"]);
          }else if(date_end.isValid() == false){
            test = false;
            setDate_endError([true, "date n est pas valide"]);
          }

          if(test){

            var m = date_start.get('month')+1;
            const date_a = date_start.get('date') +"/"+m +"/"+date_start.get('year');
            m = date_end.get('month')+1
            const date_b = date_end.get('date') +"/"+m+"/"+date_end.get('year');
            m = date_restart.get('month')+1
            const date_c = date_restart.get('date') +"/"+m+"/"+date_restart.get('year');

            const data = {
              "id_person":person.id,
              "vacance_type":type,
              "days_taken":days_taken,
              "date_start":date_a,
              "date_ends":date_b,
              "date_restart":date_c,
            }

            console.log(data);

            const token = localStorage.getItem("auth_token");
            setResponse(await addNewVacance(token, JSON.stringify(data)));                        

          }else{
            console.log("error");
            setLoadError(true);
          }
        }

         const change_type = (event) => {
          if (event.target.value == ""){
          setType("")
        }else if (event.target.value == 1){
          setType("عطلة سنوية")
        }else if (event.target.value == 2){
          setType("عطلة إسترجاع")
        }else if (event.target.value == 3){
          setType("عطلة إستثنائية")
        };

        
      }

      const fillDates = () =>{
        
        var test = true;
        setDate_startError([false, ""]);
        setDays_takenError([false, ""]);
        
          if(date_start == null || date_start == ""){
            test = false;
            setDate_startError([true, "champ est obligatoire"]);
          }else if(date_start.isValid() == false){
            test = false;
            setDate_startError([true, "date n est pas valide"]);
          }


          if (days_taken == "" || days_taken == 0){
            test = false;
            setDays_takenError([true, "champ est obligatoire"]);
          }


          if(test){
        
            const newEnd = dayjs(date_start).add(parseInt(days_taken) - 1, "day");
            setDate_end(newEnd);

    // optional: set restart date to the day after end
            const newRestart = newEnd.add(1, "day");
            setDate_restart(newRestart);

          }else{
            console.log("error");
            setLoadTwoError(true);
          }


      }


        React.useEffect(() =>{
          try{
            if (personsData == "no data"){
              setResponseErrorSignal(true);
            } else if(personsData != "") {
              setAllPersons(personsData);
              setOpen(true);
            }
          }catch(e){
            console.log(e);
          }
        }, [personsData]);


        React.useEffect(() => {

          console.log(response);
    
          if (response == "error"){
            setResponseErrorSignal(true);
          } else if(response != "") {
            setResponseSuccesSignal(true);
          }
    
        }, [response]);

        React.useEffect(() => {

          setLoading(true);
          setDateFilterError([false, ""]);

          const fetchData = async () => {
            try {
              const token = localStorage.getItem("auth_token");
              var year = dateFilter.get('year')
              setData(await getAllVacancesOfYear(token, year));
              setLoading(false);
            } catch (error) {
              console.log("error", error);
            }
          };
      
          
          if (dateFilter.isValid() == false || dateFilter ==""){
            setDateFilterError([true, "une erreur sur le champ de date"]);
            setDateFilterNotErr(true);
          }else{
            fetchData();
          }

          setOpen(false);
    
        }, [response, dateFilter]);

      

        const deleteBonSortieOpen = () =>{
          setDate_real_restart("");
          setDate_real_restartError([false, ""]);
          if(selectionModel.length == 0){
            setSelectionError(true);
          }else{   
            setOpenDelete(true);
          }
          
        }

        const deleteBonSortieOpenEnd = () =>{
          setDate_real_restart("");
          setDate_real_restartError([false, ""]);
          if(selectionModel.length == 0){
            setSelectionError(true);
          }else{

              const inputDay = dayjs(selectedRow.date_restart).startOf("day");
              const today = dayjs().startOf("day");

              if (inputDay.isSame(today) || inputDay.isAfter(today)) {
                setLoaError(true);
              } else {
                console.log("logging for end of vacance.......");
                setOpenDelete(true);
                
              } 
          }
          
        }

        const deleteBonSortieClose = () =>{
          setOpenDelete(false);
        }
  
        const deleteConfirmation = async () =>{

          var test = true;

          setDate_real_restartError([false, ""]);

          if(date_real_restart == null || date_real_restart == ""){
            test = false;
            setDate_real_restartError([true, "champ est obligatoire"]);
          }else if(date_real_restart.isValid() == false){
            test = false;
            setDate_real_restartError([true, "date n est pas valide"]);
          }
          if(test){
             var m = date_real_restart.get('month')+1;
            const date_a = date_real_restart.get('date') +"/"+m +"/"+date_real_restart.get('year');
            
            const data = {
              "id_vacance":selectionModel[0],
              "date_real_restart":date_a,
            }
            setOpenDelete(false);
            const token = localStorage.getItem("auth_token");
            setResponse(await restartVacance(token, JSON.stringify(data))); 
          }
          
        }

        const handleChangeRealRestart = (newValue) =>{
          setDate_real_restart(newValue);
        }


        const handleColumnResize = (params) => {
    // params typically contains colDef.field and width
    setColumns((prev) =>
      prev.map((c) => (c.field === params.colDef.field ? { ...c, width: params.width, flex: undefined } : c))
    );
  };

        return(

          <React.Fragment>

            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={2}>

              <Grid item xs={6}>

              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        views={['year']}
                                                        label="إختر السنة"
                                                        value={dateFilter}
                                                        onChange={handleChangeFilterDate}
                                                        renderInput={(params) => <TextField {...params} error={dateFilterError[0]}
                                                        helperText={dateFilterError[1]} 
                                                        required/>}
                                                />

              </LocalizationProvider>

              </Paper>
                
              </Grid>

              <Grid item xs={6}>

              <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& > *': {
                        m: 1,
                        },
                    }}
                >
                <ButtonGroup variant="outlined" aria-label="outlined primary button group" orientation="vertical">
                  <Button startIcon={<AddCircleOutlineIcon />} onClick={addBonSortieOpen}>إضافة عطلة</Button>
                  <Button startIcon={<KeyboardReturnIcon />} onClick={deleteBonSortieOpen}>إسئناف خاص</Button>
                  <Button startIcon={<AssignmentReturnIcon />} onClick={deleteBonSortieOpenEnd}>إسئناف نهاية العطلة</Button>
                </ButtonGroup>
                </Box>
                
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <div style={{ height: 700, width: '100%' }}>
                          <DataGrid
                            components={{
                              Toolbar: GridToolbar,
                            }}
                              rows={data}
                              columns={columns}
                              pageSize={15}
                              checkboxSelection = {false}
                              loading={loading}
                              disableMultipleSelection={true}
                              onRowClick={(params) => {
                                // keep grid selection in sync (IDs) and also store full row
                                setSelectionModel([params.id]);
                                setSelectedRow(params.row);
                              }}
                              onRowSelectionModelChange={(newModel) => setSelectionModel(newModel)} 
                              selectionModel={selectionModel}
                              getRowClassName={getRowClassName}
        onColumnResize={handleColumnResize}
        density="compact"
        sx={{
          // row background colors (light, non-intrusive)
          '& .row-red': {
            bgcolor: (theme) => theme.palette.error.light,
            '&:hover': { bgcolor: (theme) => theme.palette.error.main },
          },
          '& .row-yellow': {
            bgcolor: (theme) => theme.palette.warning.light,
            '&:hover': { bgcolor: (theme) => theme.palette.warning.main },
          },
          // optional: keep text readable
          '& .row-red, & .row-yellow': {
            color: (theme) => theme.palette.getContrastText(theme.palette.background.paper),
          }
        }}
                              
                              
                          />
                    </div>   
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />

            <Dialog open={open} onClose={addBonSortieClose}  maxWidth="lg" fullWidth={true}>
                  <DialogTitle>إضافة عطلة جديدة</DialogTitle>
                    <DialogContent>
                      <Grid container spacing={2}>
                                        <Grid item xs={4}>
                                          <Autocomplete
                                                    disablePortal
                                                    value={person}
                                                    onChange={(event, newVlue) =>{
                                                        setPerson(newVlue);
                                                        
                                                    }}
                                                    options={allPersons}
                                                    renderInput={(params) => <TextField {...params} error={personError[0]}
                                                    helperText={personError[1]} fullWidth variant="standard" label="الموظف" 
                                                    required/>}
                                                /> 

                                        </Grid>
                                        <Grid item xs={4}>
                                               <FormControl variant="standard" sx={{ m: 1, width: 300 }}>
                                  <InputLabel required htmlFor="grouped-select"
                                  error={typeError[0]}
                                  helperText={typeError[1]}>نوع العطلة</InputLabel>
                                    <Select defaultValue="" id="grouped-select" label="نوع العطلة"
                                    onChange={change_type}>
                                      <MenuItem value="">
                                        <em>None</em>
                                      </MenuItem>
                                      <MenuItem value={1}>عطلة سنوية</MenuItem>
                                      <MenuItem value={2}>عطلة إسترجاع</MenuItem>
                                      <MenuItem value={3}>عطلة إستثنائية</MenuItem>
                                    </Select>
                                </FormControl>  
                                        
                                        </Grid>

                                        <Grid item xs={4}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        label="تاريخ بداية العطلة"
                                                        inputFormat="DD/MM/YYYY"
                                                        value={date_start}
                                                        onChange={handleChangeDateStart}
                                                        renderInput={(params) => <TextField {...params} error={date_startError[0]}
                                                        helperText={date_startError[1]} 
                                                        required/>}
                                                />

                                            </LocalizationProvider>
                                        </Grid>

                        
                      </Grid>

                      <br></br> 

                      <Grid container spacing={2}>

                        <Grid item xs={4}>
                          <TextField
                                                  error={days_takenError[0]}
                                                  helperText={days_takenError[1]}
                                                  margin="dense"
                                                  id="days_taken"
                                                  label="عدد أيام العطلة"
                                                  fullWidth
                                                  variant="standard"
                                                  type="number"
                                                  value={days_taken}
                                                  onChange={(event) => {setDays_taken(event.target.value)}}
                                                  required
                                          />

                                          <IconButton aria-label="delete" size="large" onClick={fillDates}>
                                            <EventRepeatIcon fontSize="inherit" />
                                          </IconButton>
                                        
                        </Grid>

                                      <Grid item xs={4}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        label="تاريخ نهايةالعطلة"
                                                        inputFormat="DD/MM/YYYY"
                                                        disabled={true}
                                                        value={date_end}
                                                        onChange={handleChangeDateEnd}
                                                        renderInput={(params) => <TextField {...params} error={date_endError[0]}
                                                        helperText={date_endError[1]} 
                                                        required/>}
                                                />

                                            </LocalizationProvider>
                                        </Grid>

                                        <Grid item xs={4}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        label="تاريخ الإستئناف"
                                                        inputFormat="DD/MM/YYYY"
                                                        value={date_restart}
                                                        onChange={handleChangeDateRestart}
                                                        renderInput={(params) => <TextField {...params} error={date_restartError[0]}
                                                        helperText={date_restartError[1]} 
                                                        required/>}
                                                />

                                            </LocalizationProvider>
                                        </Grid>

                            </Grid> 
                    </DialogContent>
                              <DialogActions>
                                <Button onClick={addBonSortieClose}>إلغاء</Button>
                                <Button onClick={addBonSortieSave}>حفظ</Button>
                              </DialogActions>   

                    
            </Dialog>


            <Dialog open={openDelete}
                                    TransitionComponent={Transition}
                                    keepMounted
                                    onClose={deleteBonSortieClose}
                                    aria-describedby="alert-dialog-slide-description"
                                  >
                                    <DialogTitle>{"تأكيد الإستئناف"}</DialogTitle>
                                    <DialogContent>
                                      <Grid item xs={4}>
                                        
                                      <DialogContentText id="alert-dialog-slide-description">
                                      معلومات عطلة هذا الموظف سوف تحفظ في أرشيف العطل
                                      </DialogContentText>

                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DesktopDatePicker
                                                        label="تاريخ الإستئناف"
                                                        inputFormat="DD/MM/YYYY"
                                                        value={date_real_restart}
                                                        onChange={handleChangeRealRestart}
                                                        renderInput={(params) => <TextField {...params} error={date_real_restartError[0]}
                                                        helperText={date_real_restartError[1]} 
                                                        required/>}
                                                />

                                            </LocalizationProvider>
                                        </Grid>
                                    </DialogContent>
                                    <DialogActions>
                                      <Button onClick={deleteBonSortieClose}>إلغاء</Button>
                                      <Button onClick={deleteConfirmation}>إستئناف</Button>
                                    </DialogActions>
                      </Dialog>
            
          </Container>

            {loaError ? <Alt type='error' message='لم تنتهي عطلة الموظف' onClose={()=> setLoaError(false)}/> : null}
            {loadTwoError ? <Alt type='error' message='يجب ملئ تاريخ بداية العطلة و عدد الايام' onClose={()=> setLoadTwoError(false)}/> : null}
            {loadError ? <Alt type='error' message='Des erruers sur les données' onClose={()=> setLoadError(false)}/> : null}
            {responseSuccesSignal ? <Alt type='success' message='Opération réussie' onClose={()=> setResponseSuccesSignal(false)}/> : null}
            {responseErrorSignal ? <Alt type='error' message='Opération a échoué' onClose={()=> setResponseErrorSignal(false)}/> : null}
            {selectionError ? <Alt type='error' message='Selectioner un item' onClose={()=> setSelectionError(false)} /> : null}
          
        </React.Fragment>



        );

  }