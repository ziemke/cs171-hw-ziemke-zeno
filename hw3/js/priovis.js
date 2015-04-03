/**
 * Created by Hendrik Strobelt (hendrik.strobelt.com) on 1/28/15.
 */



/*
 *
 * ======================================================
 * We follow the vis template of init - wrangle - update
 * ======================================================
 *
 * */

/**
 * PrioVis object for HW3 of CS171
 * @param _parentElement -- the HTML or SVG element (D3 node) to which to attach the vis
 * @param _data -- the data array
 * @param _metaData -- the meta-data / data description object
 * @constructor
 */
PrioVis = function(_parentElement, _data, _metaData){
    this.parentElement = _parentElement;
    this.data = _data;
    this.metaData = _metaData;
    this.displayData = [];
    this. ranges = [];



    // TODO: define all "constants" here

    this.margin = {top: 20, right: 20, bottom: 200, left: 50},
    this.width = 650 - this.margin.left - this.margin.right,
    this.height = 440 - this.margin.top - this.margin.bottom;


    this.initVis();

}


/**
 * Method that sets up the SVG and the variables
 */
PrioVis.prototype.initVis = function(){

    var that = this; // read about the this


    
    this.svg = this.parentElement.append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")


         this.svg.append("text")
        .attr("class", "vis_label")
        .text("Distribution of priorities:")
        .attr("x", 5)
        .attr("y", -5)


    //TODO: construct or select SVG
    //TODO: create axis and scales

    // filter, aggregate, modify data
    this.wrangleData(null);

    this.x = d3.scale.ordinal()
        .rangeRoundBands([0, this.width], .1);

    this.y = d3.scale.linear()
        .range([this.height, 0]);

    this.xAxis = d3.svg.axis()
        .scale(this.x)
        .orient("bottom");

    this.yAxis = d3.svg.axis()
        .scale(this.y)
        .orient("left");


    this.svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + this.height + ")")
      
    this.svg.append("g")
      .attr("class", "y axis")


    this.line_average = this.svg.append("line");

    // call the update method
    this.updateVis();
}


/**
 * Method to wrangle the data. In this case it takes an options object
 * @param _filterFunction - a function that filters data or "null" if none
 */
PrioVis.prototype.wrangleData= function(_filterFunction){

    // displayData should hold the data which is visualized
    this.displayData = this.filterAndAggregate(_filterFunction);

    //// you might be able to pass some options,
    //// if you don't pass options -- set the default options
    //// the default is: var options = {filter: function(){return true;} }
    //var options = _options || {filter: function(){return true;}};


}



/**
 * the drawing function - should use the D3 selection, enter, exit
 */
PrioVis.prototype.updateVis = function(){

    // Dear JS hipster,
    // you might be able to pass some options as parameter _option
    // But it's not needed to solve the task.
    // var options = _options || {};


    // TODO: implement...
    // TODO: ...update scales
    // TODO: ...update graphs

    var that = this;
      // updates scales
      this.x.domain(this.displayData.map(function(d,i) { return d.meta_data["item-title"]; }));
      this.y.domain([0, d3.max(this.displayData, function(d) { return d.count; })]);

    this.svg.select(".x.axis")
          .call(this.xAxis)
          .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", function(d) { return "rotate(-65)" });

    this.svg.select(".y.axis")
          .call(this.yAxis)


        var bars = this.svg.selectAll(".bar")
          .data(this.displayData)

        bars.enter().append("rect")
          .attr("class", "bar")

        bars
          .style("fill", function(d) { return d.meta_data["item-color"]; })
          .attr("x", function(d) { return that.x(d.meta_data["item-title"]); })
          .attr("width", this.x.rangeBand())
          .attr("y", function(d) { return that.y(d.count); })
          .attr("height", function(d) { return that.height - that.y(d.count); })

        bars.exit().remove();

   if (this.ranges.length > 1) {
        var bars_brush1 = d3.selectAll("rect.bar:nth-child(odd)");
        var bars_brush2 = d3.selectAll("rect.bar:nth-child(even)");

        bars.attr("width",  function(d) { return d3.select(this).attr("width") / 2.5 });

        bars_brush2.attr("x", function(d) { return parseInt(d3.select(this).attr("x")) + parseInt(d3.select(this).attr("width")) + 2; });
    } 

    var growth_ellipses = this.svg.selectAll(".circle")
     .data(this.get_growth_rates(this.displayData));

    growth_ellipses.enter().append("ellipse")
        .attr("class", "circle")

    growth_ellipses
        .style("stroke", function(d) { return d["ellipse-color"] })
        .attr("cx", function(d) { return that.x(d["ellipse-title"]) + 13; })
        .attr("cy", function(d) { return that.y(d["count"]) - 10; })
        .attr("rx", 16)
        .attr("ry", 8)
        .text(function(d) { return d["count"]})

    growth_ellipses.exit().remove();

    var growth_labels = this.svg.selectAll(".circle_label")
     .data(this.get_growth_rates(this.displayData));

    growth_labels.enter().append("text")
        .attr("class", "circle_label")

    growth_labels
        .style("fill", function(d) { return d["ellipse-color"] })
        .attr("x", function(d) { return that.x(d["ellipse-title"]) + 13; })
        .attr("y", function(d) { return that.y(d["count"]) - 6; })
        .text(function(d) { return d3.format("%")(d["growth_rate"]);})

    growth_labels.exit().remove();

      this.line_average.attr("x1", 0)
                    .attr("y1", that.y(that.average_count(that.data, that.metaData)))
                    .attr("x2", that.width)
                    .attr("y2", that.y(that.average_count(that.data, that.metaData)))
                    .attr("stroke-width", 1)
                    .attr("stroke", "black")
                    .attr("title", that.average_count(that.data, that.metaData)) 
                    .attr("id", "averageLine")
}


/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */
PrioVis.prototype.onSelectionChange= function (ranges){
    that = this;

    this.ranges = ranges;
    if (ranges.length > 0) { 
        this.wrangleData(function(d,r){return d.time>=r[0] && d.time<=r[1];})
    } else {
        this.wrangleData(null)
    }

    
    this.updateVis();

}


/*
*
* ==================================
* From here on only HELPER functions
* ==================================
*
* */

PrioVis.prototype.zip = function(source1, source2){
    var res=[];
    source1.forEach(function(o,i){
       res.push(o);
       res.push(source2[i]);
    });
    return res;
}

PrioVis.prototype.get_growth_rates = function(nested_data){

   if (this.ranges.length > 1) {
       return nested_data.chunk(2).map(function(d) {
            return {
                "ellipse-color": d[0]["meta_data"]["item-color"],
                "ellipse-title": d[0]["meta_data"]["item-title"], 
                "growth_rate": d[1]["count"]/d[0]["count"]-1,
                "count": d3.max([d[1]["count"], d[0]["count"]])
            }
        });
   } else {
     return [];
    }
}


//From: http://stackoverflow.com/questions/8495687/split-array-into-chunks/10456644#10456644
Array.prototype.chunk = function(chunkSize) {
    var array=this;
    return [].concat.apply([],
        array.map(function(elem,i) {
            return i%chunkSize ? [] : [array.slice(i,i+chunkSize)];
        })
    );
}

PrioVis.prototype.average_count = function(d) {
    var nested_data = this.displayData;//this.nest_data(this.data, this.metaData);

    var res = d3.sum(nested_data, function(d){return d.count;}) / nested_data.length;

    return res;
}

PrioVis.prototype.nest_data = function(filtered_data, meta_data) {
    return d3.range(0, 16).map(function (i) {
            return {
                "meta_data": meta_data.priorities[i],
                "count": d3.sum(filtered_data.map(function(d) { return d.prios[i]; })) / filtered_data.length
              }
    });
}




/**
 * The aggregate function that creates the counts for each age for a given filter.
 * @param _filter - A filter can be, e.g.,  a function that is only true for data of a given time range
 * @returns {Array|*}
 */
PrioVis.prototype.filterAndAggregate = function(_filter){
    // Set filter to a function that accepts all items
    // ONLY if the parameter _filter is NOT null use this parameter
    //Dear JS hipster, a more hip variant of this construct would be:
    
    var filter = _filter || function(){return true;}

    var that = this;

    if (this.ranges.length > 1) {
    
        var filtered_data = [
            this.data.filter(function(d) {
                return filter(d, that.ranges[0])
            }),
            this.data.filter(function(d) {
                return filter(d, that.ranges[1])
            })
        ]

        var res_1 = this.nest_data(filtered_data[0], this.metaData);
        var res_2 = this.nest_data(filtered_data[1], this.metaData);

        var res = this.zip(res_1, res_2);
    } else {
         var filtered_data = this.data.filter(function(d) {
            return filter(d, that.ranges[0])
        });

        var res = this.nest_data(filtered_data, this.metaData);
    }




    // accumulate all values that fulfill the filter criterion
    return res;

}




