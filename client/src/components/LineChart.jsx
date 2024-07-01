import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
const LineChart = ({ data }) => {
  const svgRef = useRef();
  useEffect(() => {
    if (!data || data.length === 0) return;
    const margin = { top: 20, right: 30, bottom: 50, left: 70 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    const svg = d3.select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    const xScale = d3.scaleBand()
      .domain(data.map(d => d.topics))
      .range([0, width])
      .padding(0.1);
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)])
      .nice()
      .range([height, 0]);
    const colorScale = d3.scaleOrdinal()
      .domain(['Intensity', 'Likelihood', 'Relevance', 'Year', 'Country', 'Topics', 'Region', 'City'])
      .range(d3.schemeCategory10);
    ['Intensity', 'Likelihood', 'Relevance', 'Year', 'Country', 'Topics', 'Region', 'City'].forEach(variable => {
      svg.selectAll(`.${variable}`)
        .data(data)
        .join('rect')
        .attr('class', `${variable}`)
        .attr('x', d => xScale(d.topics) + xScale.bandwidth() / 8 * ['Intensity', 'Likelihood', 'Relevance', 'Year', 'Country', 'Topics', 'Region', 'City'].indexOf(variable))
        .attr('width', xScale.bandwidth() / 8)
        .attr('y', d => yScale(d[variable.toLowerCase()]))
        .attr('height', d => height - yScale(d[variable.toLowerCase()]))
        .attr('fill', colorScale(variable));
    });
    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-45) translate(-10, 0)')
      .attr('fill', 'white');
    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .attr('fill', 'white');
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width - 100}, 10)`);
    legend.selectAll('rect')
      .data(['Intensity', 'Likelihood', 'Relevance', 'Year', 'Country', 'Topics', 'Region', 'City'])
      .join('rect')
      .attr('x', 0)
      .attr('y', (d, i) => i * 20)
      .attr('width', 10)
      .attr('height', 10)
      .attr('fill', colorScale);
    legend.selectAll('text')
      .data(['Intensity', 'Likelihood', 'Relevance', 'Year', 'Country', 'Topics', 'Region', 'City'])
      .join('text')
      .attr('x', 15)
      .attr('y', (d, i) => i * 20 + 9)
      .text(d => d)
      .style('font-size', '12px')
      .attr('fill', 'white');
    return () => {
      svg.selectAll('*').remove();
    };   
  }, [data]);
  return <svg ref={svgRef}></svg>;
};
export default LineChart;