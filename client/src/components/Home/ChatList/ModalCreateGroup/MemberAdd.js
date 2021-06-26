import { Avatar, Box, Chip, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';



const useStyles = makeStyles(() => ({
  output: {
    width: '100%',
    height: '100px',
    border: '1px solid #c9c9c9',
    borderRadius: 5,
    flexWrap: 'wrap',
    overflow: 'auto'
  },
  chip: {
    margin: 5,
    color: '#5B9BD5'
  }
}))

const MemberTag = ({ memberIndex, src, label, handleDelete }) => {

  const classes = useStyles();

  const onDelete = () => {
    handleDelete(memberIndex);
  }

  return (
    <Chip
      avatar={<Avatar src={src} />}
      label={label}
      onDelete={onDelete}
      className={classes.chip}
    />)
}

const MemberAdd = ({ members, handleDelete, warning }) => {

  const classes = useStyles();
  
  return (
    <Box  my={1} width={1}>
      <Typography variant="subtitle2" color="primary">Added Members</Typography>
      <Box mt={1} className={classes.output} >
        {
          members.length !== 0 ? members.map((member, index) =>
            <MemberTag
              key={index}
              handleDelete={handleDelete}
              src={member.avatar}
              memberIndex={index}
              label={`${member.lastname} ${member.firstname}`} />) : <Typography style={{ color: "#e16969" }} variant="body2">{`${warning}`}</Typography>
        }
      </Box>
    </Box>

  )
}

export default MemberAdd