import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Typography, Box, Paper, Button, TextField, Grid, Card, CardContent, 
  CardMedia, CardActions, IconButton, Chip, Tooltip, InputAdornment,
  Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select,
  FormControl, InputLabel
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SortIcon from '@mui/icons-material/Sort';

function GearList() {
  // State for filter dialog
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    category: '',
    minValue: '',
    maxValue: '',
    status: ''
  });
  
  // This would come from an API in a real application
  const gearItems = [
    {
      id: 1,
      name: 'Fender Stratocaster',
      category: 'Electric Guitar',
      brand: 'Fender',
      image: 'https://via.placeholder.com/150',
      purchaseDate: '2024-01-15',
      value: 1200,
      status: 'Active',
      nextMaintenance: '2025-07-15'
    },
    {
      id: 2,
      name: 'Gibson Les Paul',
      category: 'Electric Guitar',
      brand: 'Gibson',
      image: 'https://via.placeholder.com/150',
      purchaseDate: '2023-11-20',
      value: 2500,
      status: 'Active',
      nextMaintenance: '2025-06-20'
    },
    {
      id: 3,
      name: 'Roland Jazz Chorus',
      category: 'Amplifier',
      brand: 'Roland',
      image: 'https://via.placeholder.com/150',
      purchaseDate: '2024-03-05',
      value: 800,
      status: 'In Repair',
      nextMaintenance: '2025-09-05'
    },
    {
      id: 4,
      name: 'Taylor 814ce',
      category: 'Acoustic Guitar',
      brand: 'Taylor',
      image: 'https://via.placeholder.com/150',
      purchaseDate: '2023-08-12',
      value: 3200,
      status: 'Active',
      nextMaintenance: '2025-06-20'
    },
  ];
  
  const categories = ['Electric Guitar', 'Acoustic Guitar', 'Bass Guitar', 'Amplifier', 'Effects Pedal', 'Accessory'];
  const statuses = ['Active', 'Inactive', 'In Repair', 'Borrowed', 'Lent Out'];
  
  const handleOpenFilter = () => {
    setFilterOpen(true);
  };
  
  const handleCloseFilter = () => {
    setFilterOpen(false);
  };
  
  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.value
    });
  };
  
  const handleApplyFilters = () => {
    // In a real app, this would filter the data or make an API call with filter params
    handleCloseFilter();
  };
  
  const handleClearFilters = () => {
    setFilters({
      category: '',
      minValue: '',
      maxValue: '',
      status: ''
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Gear Inventory
        </Typography>
        
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          component={Link}
          to="/gear/add"
        >
          Add Gear
        </Button>
      </Box>
      
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            placeholder="Search gear..."
            variant="outlined"
            size="small"
            sx={{ flexGrow: 1 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          
          <Tooltip title="Filter">
            <IconButton onClick={handleOpenFilter}>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Sort">
            <IconButton>
              <SortIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
      
      <Grid container spacing={3}>
        {gearItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {item.brand} • {item.category}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">
                    Value: ${item.value}
                  </Typography>
                  <Chip 
                    label={item.status} 
                    size="small"
                    color={item.status === 'Active' ? 'success' : 
                           item.status === 'In Repair' ? 'warning' : 'default'}
                  />
                </Box>
                <Typography variant="caption" display="block">
                  Next maintenance: {item.nextMaintenance}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" component={Link} to={`/gear/${item.id}`}>View Details</Button>
                <Box sx={{ flexGrow: 1 }} />
                <IconButton size="small">
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small">
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Filter Dialog */}
      <Dialog open={filterOpen} onClose={handleCloseFilter}>
        <DialogTitle>Filter Gear</DialogTitle>
        <DialogContent sx={{ pt: 1 }}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-label">Category</InputLabel>
            <Select
              labelId="category-label"
              name="category"
              value={filters.category}
              label="Category"
              onChange={handleFilterChange}
            >
              <MenuItem value="">Any</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category} value={category}>{category}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Box sx={{ display: 'flex', gap: 2, my: 2 }}>
            <TextField
              label="Min Value"
              name="minValue"
              type="number"
              value={filters.minValue}
              onChange={handleFilterChange}
              fullWidth
            />
            <TextField
              label="Max Value"
              name="maxValue"
              type="number"
              value={filters.maxValue}
              onChange={handleFilterChange}
              fullWidth
            />
          </Box>
          
          <FormControl fullWidth margin="normal">
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              name="status"
              value={filters.status}
              label="Status"
              onChange={handleFilterChange}
            >
              <MenuItem value="">Any</MenuItem>
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>{status}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClearFilters}>Clear</Button>
          <Button onClick={handleCloseFilter}>Cancel</Button>
          <Button onClick={handleApplyFilters} variant="contained">Apply</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default GearList;