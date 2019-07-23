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


        // Config
        const margin = {'top': 0, 'right': 0, 'bottom': 0, 'left': 0};//{'top': 25, 'right': 54, 'bottom': 50, 'left': 10};
        const width = 345 - margin.left - margin.right;//+svg.attr('width') - (margin.right + margin.left);
        const height = 300 - margin.left - margin.right;//+svg.attr('height') - (margin.top + margin.bottom);

        // Get svg
        const svg = d3.select('#scatter')
            .append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // // Config
        // const margin = {'top': 0, 'right': 0, 'bottom': 0, 'left': 0};//{'top': 25, 'right': 54, 'bottom': 50, 'left': 10};
        // const width = +svg.attr('width') - (margin.right + margin.left);
        // const height = +svg.attr('height') - (margin.top + margin.bottom);

        // Create and position container
        const container = svg.append('g')
            .attr('class', 'container')
            .style('transform', `translate(${margin.left}px, ${margin.top}px)`);

        // Customization
        svg.selectAll(".tick line").attr("stroke", "white")

        // X Scale
        const scX = d3.scaleLinear()
            .domain(d3.extent(data, (d) => {
                return d.experience_yr;
            }))
            .range([0, width]);
        svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(scX));

        const scY = d3.scaleLinear()
            .domain(d3.extent(data, (d) => {
                return d.hw1_hrs;
            }))
            .range([0, height]);
        svg.append("g")
          .call(d3.axisLeft(scY));
   

        const scRad = d3.scaleSqrt()
            .domain(d3.extent(data, (d) => {
                return d.age;
            }))
            .range([2, 5]);

        // Build Bubbles
        // const bubbles = container.selectAll('.bubbles')
        //     .data(data)
        //     .enter()
        //     .append("g")
        //     .append("circle")
        //     .attr("class", "bubbles")
        //     .append("circle")
            svg.append('g')
              .selectAll("dot")
              .data(data)
              .enter()
              .append("circle")
                .attr("scX", function (d) { return scX(d.experience_yr); } )
                .attr("scY", function (d) { return scY(d.hw1_hrs); } )
                .attr("scRad", 1.5)
                .style("fill", "#69b3a2")
            };
        // console.log(bubbles)





//         // Add X axis label:
//         svg.append("rect")
//             .attr("text-anchor", "end")
//             .attr("x", width/2 + margin.left)
//             .attr("y", height + margin.top + 20)
//             .attr("height", height)
//             .attr("width", height)
//             .text("Programing experience");

//         // Y axis label:
//         svg.append("text")
//             .attr("text-anchor", "end")
//             .attr("transform", "rotate(-90)")
//             .attr("y", -margin.left + 20)
//             .attr("x", -margin.top - height/2 + 20)
//             .text("HW1 Hours")

//         // Color scale: give me a specie name, I return a color
//         var color = d3.scaleOrdinal()
//           .domain(["setosa", "versicolor", "virginica" ])
//           .range([ "#F8766D", "#00BA38", "#619CFF"])

//         // Add dots
//         svg.append('g')
//           .selectAll("dot")
//           .data(data)
//           .enter()
//           .append("circle")
//             .attr("cx", function (d) { return x(d.Sepal_Length); } )
//             .attr("cy", function (d) { return y(d.Petal_Length); } )
//             .attr("r", 5)
//             .style("fill", function (d) { return color(d.Species) } )

// }



    }


)();