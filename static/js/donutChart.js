'use strict';

// IIFE
(function () {

    // Init data
    let data = [];

    // Fetch json data
    d3.json('/load_data', (d) => {

    	//Parse
    	return d.forearth(function (d){
    		d.experience_yr = +d.experience_yr;
    		d.hw1_hr = +d.hw1_hr;
    		d.age = +d.age;

    	})

    }).then((d) => {

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
        const svg = d3.select('#donutChart');


        const margin = {'top': 0, 'right': 0, 'bottom': 0, 'left': 0};
        const width = +svg.attr('width') - (margin.right + margin.left);
        const height = +svg.attr('height') - (margin.top + margin.bottom);

        // Create and position container
        const container = svg.append('g')
            .attr('class', 'container')
            .style('transform', `translate(${(width/2)+margin.left}px, ${(height/2)+margin.top}px)`);

        // Get prog_lang form data
        const prog_langs_data = d3.nest()
            .key(function (d){
            	return d.prog_lang;

            })
            .rollup(function (v){
            	return v.length;
            })
            .entries(data);

        //Config for chart
        const thickness = 50;
        const duration = 500;
        const radius = Math.min(width,height) /2;
        const color = d3.scaleOrdinal()
            .domain(prog_langs_data.keys())
            .range([
            	'#1b7688',
            	'#1b7676',
            	'#f9d057',
            	'#f29e2e',
            	'#9b0a0a',
            	'#d7191c'
            ]);

        const arc = d3.arc()
            .innerRadius(radius - 50)
            .outerRadius(radius);

        const arcMouseOver = d3.arc()
            .innerRadius(radius - thickness - 10)
            .outerRadius(radius);


        const pie = d3.pie()
            .sort(null)
            .value(function (d){
            	return d.value;
            })

        var path = container.selectAll('path')
            .data(pie(prog_langs_data))
            .enter()
            .append("g")
            .on("mouseover", function(d){
                  let g = d3.select(this)
                    .style("cursor", "pointer")
                    .style("fill", "gray")
                    .append("g")
                    .attr("class", "text-group");
                  g.append("text")
                    .attr("class", "name-text")
                    .text(`${d.data.key}`)
                    .attr('text-anchor', 'middle')
                    .attr('dy', '-1.2em');
  
                  g.append("text")
                    .attr("class", "value-text")
                    .text(`${d.data.value}`)
                    .attr('text-anchor', 'middle')
                    .attr('dy', '.6em');
                })
              .on("mouseout", function(d) {
                  d3.select(this)
                    .style("cursor", "none")  
                    .style("fill", color(this._current))
                    .select(".text-group").remove();
                })
              .append('path')
              .attr('d', arc)
              .attr('fill', (d,i) => color(i))
              .on("mouseover", function(d) {
                  d3.select(this)     
                    .style("cursor", "pointer")
                    .style("fill", "gray");
                })
              .on("mouseout", function(d) {
                  d3.select(this)
                    .style("cursor", "none")  
                    .style("fill", color(this._current));
                })

              .each(function(d, i) { this._current = i; });

             

    }


})();