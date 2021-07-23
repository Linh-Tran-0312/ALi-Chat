import { TextField, Grid } from '@material-ui/core';
import React from 'react';
 
const Input = ({ name, label, handleChange, type, autoFocus, half }) => {
    return(
<Grid item xs={12} sm={ half ? 6 : 12}>
        <TextField
            name={name}
            label={label}
            onChange={handleChange}
            autoFocus={autoFocus}
            required
            type={type}
            variant="outlined"
            fullWidth
        />
</Grid>
    )
}

export default Input