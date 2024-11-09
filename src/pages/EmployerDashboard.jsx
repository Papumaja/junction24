import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Box,
  Stack,
} from '@mui/material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { ThumbUp, ThumbDown } from '@mui/icons-material';
import EmployerNavigation from '../components/EmployerNavigation';

const data = [
  { name: 'Senior software developer', value: 42 },
  { name: 'Marketing assistant', value: 27 },
  { name: 'Recruiting partner', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const EmployerDashboardContent = () => {
  return (
    <div className="content">
      <Typography variant="h4" style={{ marginBottom: 32 }}>
        Job Dashboard
      </Typography>
      <Typography style={{ marginBottom: 32 }}>
        See how your company and job listings are performing. You can also
        receive tips on how to change the company's culture to make it more
        desirable.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5">Job listing saves</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name }) => name}
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
              <Typography variant="h5" style={{ marginBottom: 16 }}>
                Endorsements
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Card>
                    <Stack
                      direction="row"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="64px"
                    >
                      <ThumbUp color="primary" fontSize="large" />
                      <Typography variant="h4" style={{ marginLeft: 8 }}>
                        120
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <Grid item xs={6}>
                  <Card>
                    <Stack
                      direction="row"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      height="64px"
                    >
                      <ThumbDown color="error" fontSize="large" />
                      <Typography variant="h4" style={{ marginLeft: 8 }}>
                        9
                      </Typography>
                    </Stack>
                  </Card>
                </Grid>
                <div
                  style={{
                    marginLeft: 16,
                    marginTop: 16,
                    textAlign: 'initial',
                  }}
                >
                  Your employees agree on your keywords by <b>93 %</b>. Keep it
                  up! Here is your most controversial statement:
                  <ul>
                    <li>Empowering minorities</li>
                  </ul>
                </div>
              </Grid>
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
