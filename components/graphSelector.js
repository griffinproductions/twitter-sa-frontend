import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import {
  FormControl, MenuItem, InputLabel, Select,
} from '@mui/material';
import WordCloud from 'react-d3-cloud';

const GraphSelector = ({ data }) => {
  const {
    averageSentimentPerMinute, labelPercentages, tweetsPerSentimentPerMinute, wordScores,
  } = data;
  const negativeWords = wordScores.slice(0, 50).map((word) => ({
    text: word.text,
    value: Math.abs(word.value * 25),
  }));
  const positiveWords = wordScores.slice(wordScores.length - 50).map((word) => ({
    text: word.text,
    value: Math.abs(word.value * 25),
  }));
  const types = ['Average Sentiment Per Minute', 'Label Percentage', 'Tweets Per Sentiment Per Minute', 'Positive Word Scores', 'Negative Word Scores'];
  const [type, setType] = useState(types[0]);
  const colorPalette = ['#05ab02', '#ab0202', '#fcba03'];
  const [words, setWords] = useState(positiveWords);
  const [options, setOptions] = useState({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ['line', 'bar'] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: [
      {
        type: 'category',
        data: Object.keys(averageSentimentPerMinute).reverse(),
        axisPointer: {
          type: 'shadow',
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        min: -1,
        max: 1,
        interval: 0.1,
        axisLabel: {
          formatter: '{value}',
        },
        axisPointer: {
          snap: true,
        },
      },
    ],
    series: [
      {
        name: 'Average Sentiment Per Minute',
        type: 'line',
        data: Object.values(averageSentimentPerMinute).reverse(),
      },
    ],
  });

  const handleChange = (e) => {
    setType(e.target.value);
    switch (e.target.value) {
      case 'Average Sentiment Per Minute':
        setOptions({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999',
              },
            },
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          xAxis: [
            {
              type: 'category',
              data: Object.keys(averageSentimentPerMinute).reverse(),
              axisPointer: {
                type: 'shadow',
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              min: -1,
              max: 1,
              interval: 0.1,
              axisLabel: {
                formatter: '{value}',
              },
              axisPointer: {
                snap: true,
              },
            },
          ],
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          series: [
            {
              name: 'Average Sentiment Per Minute',
              type: 'line',
              data: Object.values(averageSentimentPerMinute).reverse(),
            },
          ],
          graph: {
            color: colorPalette,
          },
        });
        break;
      case 'Label Percentage':
        setOptions({
          tooltip: {
            trigger: 'item',
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          series: [
            {
              name: 'Label Percentage',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: Object.entries(labelPercentages).map(([key, value]) => ({
                value,
                name: `${key.toLocaleUpperCase()} (${(value * 100).toFixed(2)}%)`,
              })),
              color: colorPalette,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
          graph: {
            color: colorPalette,
          },
        });
        break;
      case 'Tweets Per Sentiment Per Minute':
        setOptions({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999',
              },
            },
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          legend: {
            data: ['Tweets Per Sentiment Per Minute'],
          },
          xAxis: [
            {
              type: 'category',
              data: Object.keys(tweetsPerSentimentPerMinute).reverse(),
              axisPointer: {
                type: 'shadow',
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
              min: 0,
              axisLabel: {
                formatter: '{value}',
              },
              axisPointer: {
                snap: true,
              },
            },
          ],
          series: [
            {
              name: 'Positive',
              type: 'line',
              color: colorPalette[0],
              data: Object.values(tweetsPerSentimentPerMinute).reverse()
                .map((value) => value.positive),
            },
            {
              name: 'Negative',
              type: 'line',
              color: colorPalette[1],
              data: Object.values(tweetsPerSentimentPerMinute).reverse()
                .map((value) => value.negative),
            },
            {
              name: 'Neutral',
              type: 'line',
              color: colorPalette[2],
              data: Object.values(tweetsPerSentimentPerMinute).reverse()
                .map((value) => value.neutral),
            },
          ],
          graph: {
            color: colorPalette,
          },
        });
        break;
      case 'Positive Word Scores':
        setWords(positiveWords);
        break;
      case 'Negative Word Scores':
        setWords(negativeWords);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="select-label">Graph Type</InputLabel>
        <Select
          labelId="select-label"
          id="select"
          value={type}
          label="Graph Type"
          onChange={handleChange}
        >
          <MenuItem value="Average Sentiment Per Minute">Average Sentiment Per Minute</MenuItem>
          <MenuItem value="Label Percentage">Sentiment Percentages</MenuItem>
          <MenuItem value="Tweets Per Sentiment Per Minute">Tweets Per Sentiment Per Minute</MenuItem>
          <MenuItem value="Positive Word Scores">Positive Word Scores</MenuItem>
          <MenuItem value="Negative Word Scores">Negative Word Scores</MenuItem>
        </Select>
      </FormControl>
      { type !== 'Positive Word Scores' && type !== 'Negative Word Scores' && (
      <ReactECharts
        option={options}
        notMerge
        style={{ width: '100%', minHeight: '400px' }}
      />
      )}
      { (type === 'Positive Word Scores' || type === 'Negative Word Scores') && (
      <WordCloud
        data={words}
        rotate={0}
      />
      )}
    </>
  );
};

export default GraphSelector;
