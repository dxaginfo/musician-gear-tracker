import React from 'react';
import { Grid, Typography, Paper, Box, Card, CardContent, CardHeader, Avatar, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import BuildIcon from '@mui/icons-material/Build';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import WarningIcon from '@mui/icons-material/Warning';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const StatCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

function Dashboard() {
  // This would come from an API in a real application
  const stats = {
    totalGear: 12,
    gearValue: 8750,
    maintenanceDue: 3,
    recentActivity: [
      { id: 1, type: 'added', item: 'Fender Stratocaster', date: '2025-06-15' },
      { id: 2, type: 'maintenance', item: 'Gibson Les Paul', date: '2025-06-14' },
      { id: 3, type: 'updated', item: 'Roland Jazz Chorus Amp', date: '2025-06-12' }
    ],
    upcomingMaintenance: [
      { id: 1, item: 'Taylor 814ce', type: 'Humidity Check', due: '2025-06-20' },
      { id: 2, item: 'Martin D-28', type: 'String Change', due: '2025-06-25' },
      { id: 3, item: 'Ibanez RG550', type: 'Setup', due: '2025-06-30' }
    ]
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats Summary */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <StatCard>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      <MusicNoteIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Total Gear
                      </Typography>
                      <Typography variant="h4">
                        {stats.totalGear}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </StatCard>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <StatCard>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                      <Typography variant="body2">$</Typography>
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Total Value
                      </Typography>
                      <Typography variant="h4">
                        ${stats.gearValue}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </StatCard>
            </Grid>
            
            <Grid item xs={12} sm={4}>
              <StatCard>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Avatar sx={{ bgcolor: 'warning.main', mr: 2 }}>
                      <BuildIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Maintenance Due
                      </Typography>
                      <Typography variant="h4">
                        {stats.maintenanceDue}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </StatCard>
            </Grid>
          </Grid>
          
          {/* Recent Activity */}
          <StyledPaper elevation={2}>
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {stats.recentActivity.map((activity) => (
              <Box key={activity.id} sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                <AccessTimeIcon color="action" sx={{ mr: 1 }} />
                <Box>
                  <Typography variant="body2">
                    {activity.type === 'added' ? 'Added' : 
                     activity.type === 'maintenance' ? 'Maintenance performed on' : 
                     'Updated'} <strong>{activity.item}</strong>
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {activity.date}
                  </Typography>
                </Box>
              </Box>
            ))}
          </StyledPaper>
        </Grid>
        
        {/* Maintenance Reminders */}
        <Grid item xs={12} md={4}>
          <StyledPaper elevation={2}>
            <Typography variant="h6" gutterBottom>
              Upcoming Maintenance
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            {stats.upcomingMaintenance.map((maintenance) => (
              <Card key={maintenance.id} sx={{ mb: 2 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: 'error.main' }}>
                      <WarningIcon />
                    </Avatar>
                  }
                  title={maintenance.item}
                  subheader={`${maintenance.type} - Due: ${maintenance.due}`}
                />
              </Card>
            ))}
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;