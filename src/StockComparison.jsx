import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const StockComparison = () => {
  // Process the stock data
  const msftData = [
    {"date":"2024-12-03","close":431.2},{"date":"2024-12-02","close":430.98},{"date":"2024-11-29","close":423.46},
    {"date":"2024-11-27","close":422.99},{"date":"2024-11-26","close":427.99},{"date":"2024-11-25","close":418.79},
    {"date":"2024-11-22","close":417},{"date":"2024-11-21","close":412.87},{"date":"2024-11-20","close":415.49},
    {"date":"2024-11-19","close":417.79},{"date":"2024-11-18","close":415.76},{"date":"2024-11-15","close":415},
    {"date":"2024-11-14","close":426.89},{"date":"2024-11-13","close":425.2},{"date":"2024-11-12","close":423.03},
    {"date":"2024-11-11","close":418.01},{"date":"2024-11-08","close":422.54},{"date":"2024-11-07","close":425.43},
    {"date":"2024-11-06","close":420.18},{"date":"2024-11-05","close":411.46},{"date":"2024-11-04","close":408.46}
  ].reverse();

  const googData = [
    {"date":"2024-12-03","close":171.34},{"date":"2024-12-02","close":171.49},{"date":"2024-11-29","close":168.95},
    {"date":"2024-11-27","close":169.23},{"date":"2024-11-26","close":169.12},{"date":"2024-11-25","close":167.65},
    {"date":"2024-11-22","close":164.76},{"date":"2024-11-21","close":167.63},{"date":"2024-11-20","close":175.98},
    {"date":"2024-11-19","close":178.12},{"date":"2024-11-18","close":175.3},{"date":"2024-11-15","close":172.49},
    {"date":"2024-11-14","close":175.58},{"date":"2024-11-13","close":178.88},{"date":"2024-11-12","close":181.62},
    {"date":"2024-11-11","close":180.35},{"date":"2024-11-08","close":178.35},{"date":"2024-11-07","close":180.75},
    {"date":"2024-11-06","close":176.51},{"date":"2024-11-05","close":169.74},{"date":"2024-11-04","close":169.24}
  ].reverse();

  // Combine the data and normalize it to percentage change from start
  const startMsft = msftData[0].close;
  const startGoog = googData[0].close;
  
  const combinedData = msftData.map((item, index) => ({
    date: item.date,
    msft: ((item.close - startMsft) / startMsft) * 100,
    googl: ((googData[index].close - startGoog) / startGoog) * 100
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>MSFT vs GOOGL Stock Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                label={{ value: 'Percentage Change (%)', angle: -90, position: 'insideLeft' }}
                domain={['auto', 'auto']}
              />
              <Tooltip 
                formatter={(value) => value.toFixed(2) + '%'}
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="msft" 
                name="Microsoft" 
                stroke="#00a8e8" 
                strokeWidth={2}
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="googl" 
                name="Google" 
                stroke="#34a853" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default StockComparison;