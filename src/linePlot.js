import React from 'react';
import { scaleLinear } from 'd3-scale';
import Axes from './Axes';
import { line as d3Line, area as d3Area } from 'd3-shape';

const drawPoints = (list_of_point_info, xScale, yScale) => {
  return list_of_point_info.map( pt => {
    const [age, prob] = pt;
    return (<circle
      cx={xScale(age)}
      cy={yScale(prob)}
      r={2}
    />);
  });
};

const drawLine = (list_of_points_info, xScale, yScale) => {
  const lineGenerator = d3Line().x( d => xScale(d[0]) ).y( d => yScale(d[1]) );
  const line = lineGenerator(list_of_points_info);
  return <path d={line}/>;
};

const drawArea = (list_of_points_info, xScale, yScale) => {
  const areaGenerator = d3Area().x( d => xScale(d[0]) ).y0(yScale(0)).y1( d => yScale(d[1]) );
  const area = areaGenerator(list_of_points_info)
  return <path className='area' d={area} />;
}

const linePlot = (props) => {
  const svgWidth = props.svgWidth || 900;
  const svgHeight= props.svgHeight || 300;

  const margin = { top: 20, right: 20, bottom: 30, left: 60 };

  const width = svgWidth - margin.left - margin.right;
  const height= svgHeight - margin.top - margin.bottom;

  const xScale = scaleLinear().domain([0,100]).range([margin.left, margin.left + width]);
  const yScale = scaleLinear().domain([0,0.06]).range([height + margin.top, margin.top]);

  const gender = {'F': 'women', 'M': 'men'};

  return (
    <div>
      <div className='title'>Age distribution for {gender[props.gender]} named {props.name} in 2017</div>

      <svg width={svgWidth} height={svgHeight}>
        <Axes
          scales={{xScale, yScale}}
          margins={margin}
          svgDimensions = {{width: svgWidth, height: svgHeight}}
        />
        <g className='line'>
          {drawLine(props.probs, xScale, yScale)}
          {drawArea(props.probs, xScale, yScale)}
        </g>
        <g className='scatter'>
          {drawPoints(props.probs, xScale, yScale)}
        </g>
        <g>
          <text transform='rotate(-90)' y='5' dy='0.71em' x='-150' textAnchor='middle'>
            Probability
          </text>
        </g>
        <g>
          <text y={svgHeight - 15} dy="0.71em" x={svgWidth/2} textAnchor="middle">
            Age (yrs)
          </text>
        </g>
        <g className='quartile'>
          {[0,2].map( num => drawLine([[props.quartiles[num], 0.00], [props.quartiles[num], 0.06]], xScale, yScale) ) }
          {drawLine([[props.quartiles[0], 0.03], [props.quartiles[2], 0.03]], xScale, yScale)}
          <circle
            cx={xScale(props.quartiles[1])}
            cy={yScale(0.03)}
            r={4}
          />
        </g>
      </svg>
    </div>
  )
}

export default linePlot;
