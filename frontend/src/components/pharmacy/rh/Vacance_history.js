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

import { getAllVacancesHistory } from '../../../actions/vacance_data';


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
    { field: 'date_restart', headerName: 'تاريخ  الإستئناف الأصلي ', flex: 0.9,width: 140 },
    { field: 'vacance_type', headerName: 'نوع العطلة ', flex: 0.9,width: 140 },
    { field: 'date_restart_real', headerName: 'تاريخ  الإستئناف ', flex: 0.9,width: 140 },
  ];

  export default function Vacance_historic_inf(){

    const [response, setResponse] = React.useState("");
    const [data, setData] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    
    const theme = useTheme

      function Copyright(props) {
          return (
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
              {'Copyright © '}
              <Link color="inherit" href="https://github.com/otmanLAHRECHE">
                EHS GUEDDI BAKIR GHARDAIA Gestion des vacances V1.1   
              </Link>{' '}
              -- created by otman LAHRECHE
              {'.'}
            </Typography>
          );
        }

        React.useEffect(() => {

          setLoading(true);
          const fetchData = async () => {
            try {
              const token = localStorage.getItem("auth_token");
              setData(await getAllVacancesHistory(token));
              setLoading(false);
            } catch (error) {
              console.log("error", error);
            }
          };
      
            fetchData();
    
        }, [response]);

      

       

        

       
  
        

       


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
                              onColumnResize={handleColumnResize}
                                density="compact"
                          />
                    </div>   
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ pt: 4 }} />



            
          </Container>

        </React.Fragment>



        );

  }