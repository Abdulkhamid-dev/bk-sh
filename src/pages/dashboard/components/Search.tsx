import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { getAllBooks } from '@/utils';
import { useDebounce } from '@/hooks/useDebounce';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setLoading } from '@/redux/reducers/settingSlice';
export default function Search() {
  const [title, setTitle] = React.useState("")
  const debouncedTitle = useDebounce(title, 500);
  const dispatch = useAppDispatch()
  const settings = useAppSelector((state) => state.settings)

  React.useEffect(() => {
    dispatch(setLoading({ key: "searchBook", status: true }))
    getAllBooks(debouncedTitle);
  }, [debouncedTitle])

  return (
    <FormControl sx={{ width: { xs: '100%', md: '25ch' } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        onChange={(e) => setTitle(e.target.value)}
        disabled={settings.loading.includes("searchBook")}
        startAdornment={
          <InputAdornment position="start" sx={{ color: 'text.primary' }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          'aria-label': 'search',
        }}
      />
    </FormControl>
  );
}
