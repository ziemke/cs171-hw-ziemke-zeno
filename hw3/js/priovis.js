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
      this.x.domain(this.displayData.map(function(d) { return d.meta_data["item-title"]; }));
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
}


/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */
PrioVis.prototype.onSelectionChange= function (selectionStart, selectionEnd){
    that = this;

    // TODO: call wrangle function
    console.log(selectionStart);
    console.log(selectionEnd);

    this.selectionStart  =  selectionStart;
    this.selectionEnd =  selectionEnd;

    this.wrangleData(function(d){return d.time>=that.selectionStart && d.time<=that.selectionEnd;})
    this.updateVis();


}


/*
*
* ==================================
* From here on only HELPER functions
* ==================================
*
* */



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
    
    var filtered_data = this.data.filter(filter);

    var res = d3.range(0, 16).map(function (i) {
        return {
            "meta_data": that.metaData.priorities[i],
            "count": d3.sum(filtered_data.map(function(d) { return d.prios[i]; }))
          }
    });



    // accumulate all values that fulfill the filter criterion
    return res;

}




