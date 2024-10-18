
import { createTheme} from '@mui/material/styles';

const myTheme = createTheme({
    palette: {
      primary: {
        main:'#1a2e2b',
        contrastText:'#fff',
      },
      secondary:{
        main:'#26433e',
        contrastText:'#fff',
      },
      info:{
        main:'#516864',
        contrastText:'#fff',
      },
      yellow:{
        main:'#ffea00',
        contrastText: '#000',
      },
      white:{
        main:'#ffffff',
      }
    },
  });

  export default myTheme;