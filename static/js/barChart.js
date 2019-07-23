'use strict';

// IIFE
(function () {

    // Init data
    let data = [];

    // Fetch json data
    d3.json('/load_data', (d) => {

        return d;
    }).then((d) => {

        // Redefine data
        data = d['users'];

        createVis();
    }).catch((err) => {

        console.error(err);
    });

    /*
     Function :: createVis()
     */
    function createVis() {

        // Get svg
        const svg = d3.select('#barChart');

        // Config
        const margin = {'top': 25, 'right': 54, 'bottom': 50, 'left': 10};
        const width = +svg.attr('width') - (margin.right + margin.left);
        const height = +svg.attr('height') - (margin.top + margin.bottom);

        // Create and position container
        const container = svg.append('g')
            .attr('class', 'container')
            .style('transform', `translate(${margin.left}px, ${margin.top}px)`);

        // Set ageMap
        const ageMap = data.map(function (d, i) {
            return d.age;
        });

        // X Scale
        const scX = d3.scaleLinear()
            .domain(d3.extent(ageMap, (d) => {
                return d;
            }))
            .range([0, width]);

        // Histogram and bins
        const histogram = d3.histogram()
            .domain(scX.domain())
            .thresholds(scX.ticks(10));

        const bins = histogram(ageMap);

        // Y Scale
        const scY = d3.scaleLinear()
            .domain([0, d3.max(bins, function (d) {
                return d.length;
            })])
            .range([0, height]);

        // Config transition
        const t = d3.transition()
            .duration(250)
            .ease(d3.easeLinear);

        // Create bars
        const bars = container.selectAll('.bar')
            .data(bins)
            .enter()
            .append('g')
            .attr('class', 'bar')
            .style('transform', (d, i) => {
                return `translate(${i * Math.floor(width / bins.length)}px, ${height - scY(d.length)}px)`;
            });

        // Create rects
        bars.append('rect')
            .attr('width', () => {
                return Math.floor(width / bins.length);
            })
            .attr('height', (d) => {
                return scY(d.length);
            })
            .attr('fill', 'rgba(127, 0, 0, 1)')
            .on('mouseover', function () {
                d3.select(this)
                    .attr('fill', 'rgba(223, 0, 0, 1')
            })
            .on('mouseout', function () {
                d3.select(this)
                    .attr('fill', 'rgba(127, 0, 0, 1');
            });


        // Add y-label
        const yLabels = bars.append('text')
            .text(function (d) {
                return d.length;
            })
            .attr('class', 'yLabel')
            .attr('y', -5)
            .attr('x', Math.floor(width / bins.length) / 2)
            .attr('text-anchor', 'middle');

        // Add x-axis
        const xAxis = container.append('g')
            .attr('transform', `translate(0, ${height + 5})`)
            .call(d3.axisBottom(scX).ticks(5));


        // Add x-label
        container.append('text')
            .attr('transform', `translate(${width/2}, ${height + 45})`)
            .attr('text-anchor', 'middle')
            .text('Age');


    }


})();