import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Box,
} from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import EmployerNavigation from '../components/EmployerNavigation';

const data = [
  { name: 'Engineering', value: 400 },
  { name: 'Marketing', value: 300 },
  { name: 'Sales', value: 300 },
  { name: 'HR', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const EmployerDashboardContent = () => {
  return (
    <div className="content">
      <h1>Job Dashboard</h1>
      <p>
        See how your company and job listings are performing. You can also
        receive tips on how to change the company's culture to make it more
        desirable.
      </p>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Job Applications by Department
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Job Listings Performance
              </Typography>
              <Box display="flex" alignItems="center" mb={1}>
                <Typography variant="body2" style={{ flex: 1 }}>
                  Active Listings
                </Typography>
                <Typography variant="body2">7/10</Typography>
              </Box>
              <LinearProgress variant="determinate" value={(7 / 10) * 100} />
              <Box display="flex" alignItems="center" mt={2} mb={1}>
                <Typography variant="body2" style={{ flex: 1 }}>
                  Closed Listings
                </Typography>
                <Typography variant="body2">3/10</Typography>
              </Box>
              <LinearProgress variant="determinate" value={(3 / 10) * 100} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Likes and Dislikes
              </Typography>
              <Box display="flex" alignItems="center" mb={1}>
                <ThumbUp color="primary" />
                <Typography variant="body2" style={{ marginLeft: 8 }}>
                  Likes: 120
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <ThumbDown color="error" />
                <Typography variant="body2" style={{ marginLeft: 8 }}>
                  Dislikes: 30
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Attention Analysis
              </Typography>
              <Typography variant="body2">
                Average Time Spent on Listings: 2m 30s
              </Typography>
              <Typography variant="body2">
                Most Viewed Listing: Software Engineer
              </Typography>
              <Typography variant="body2">
                Least Viewed Listing: HR Manager
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default function EmployerDashboard() {
  return (
    <div>
      <div className="content">
        <EmployerDashboardContent />
      </div>
      <EmployerNavigation value={0} />
    </div>
  );
}
