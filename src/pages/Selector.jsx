import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useTheme } from '@mui/material';

export default function Selector({category,setCategory}) {




  const handleChange = (event) => {
    setCategory(event.target.value);
  };


  return (
    <Box sx={{ minWidth: 120 ,color:"white"  }}  >
      <FormControl  fullWidth >
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={handleChange}
            
        >
          <MenuItem value={"water"}>Water</MenuItem>
          <MenuItem value={"electricity"}>Electricity</MenuItem>
          <MenuItem value={"infrastructure"}>Infrastructure</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
