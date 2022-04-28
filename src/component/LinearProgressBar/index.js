import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  const calcProgress = () => {
    return props.value / props.maxValue * 100;
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <Typography variant="p" color="gray" sx={{ marginRight: '5px' }}>
          Готово:
        </Typography>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="h6">{`${Math.round(
            calcProgress(),
          )}%`}</Typography>
        </Box>
      </Box>

      <Box sx={{ width: '100%', mr: 1, border: '1px solid #1976d2', borderRadius: '10px' }}>
        <LinearProgress variant="determinate" value={calcProgress()} />
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function LinearWithValueLabel({ value= 0, maxValue=100 }) {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={value} maxValue={maxValue} />
    </Box>
  );
}