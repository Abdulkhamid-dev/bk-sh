import * as React from 'react';
import Stack from '@mui/material/Stack';
import AddIcon from '@mui/icons-material/Add';

import Search from './Search';
import { Button, Typography } from '@mui/material';
import { setBookModalSetting } from '@/redux/reducers/settingSlice';
import { EActionMode } from '@/type';
import { useAppDispatch } from '@/redux/hooks';

export default function Header() {
  const dispatch = useAppDispatch()

  const openAddBookModal = () => {
    dispatch(setBookModalSetting({ visible: true, mode: EActionMode.Add }))
  }
  return (
    <Stack
      direction="row"
      sx={{
        display: 'flex',
        width: '100%',
        alignItems: { xs: 'flex-start', md: 'center' },
        justifyContent: 'space-between',
        maxWidth: { sm: '100%', md: '1700px' },
        pt: 1.5,
      }}
      spacing={2}
    >
      <Typography variant='h4'>All books</Typography>
      <Stack direction="row" sx={{ gap: 1 }}>
        <Search />
        <Button variant="contained" startIcon={<AddIcon />} onClick={openAddBookModal}>Add book</Button>
      </Stack>
    </Stack>
  );
}
