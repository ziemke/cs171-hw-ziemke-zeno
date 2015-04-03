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
 * AgeVis object for HW3 of CS171
 * @param _parentElement -- the HTML or SVG element (D3 node) to which to attach the vis
 * @param _data -- the data array
 * @param _metaData -- the meta-data / data description object
 * @constructor
 */
AgeVis = function(_parentElement, _data, _metaData){
    this.parentElement = _parentElement;
    this.data = _data;
    this.metaData = _metaData;
    this.displayData = [];



    // TODO: define all "constants" here

    this.margin = {top: 30, right: 20, bottom: 30, left: 50},
    this.width = 330 - this.margin.left - this.margin.right,
    this.height = 230 - this.margin.top - this.margin.bottom;


    this.initVis();

}


/**
 * Method that sets up the SVG and the variables
 */
AgeVis.prototype.initVis = function(){

    var that = this; // read about the this


      this.parentElement.append("div")
        .attr("id", "agevis")
        .attr("class", "vis_label")
        .text("Age distribution:")
        

    
    this.svg = this.parentElement.append("svg")
        .attr("width", this.height + this.margin.top + this.margin.bottom) //rotated
        .attr("height", this.width + this.margin.left + this.margin.right) //rotated
      .append("g")
        .attr("transform", "rotate(90,"+ this.height/2 +","+ this.width/2 +")")



    //TODO: construct or select SVG
    //TODO: create axis and scales

    // filter, aggregate, modify data
    this.wrangleData(null);



    this.x = d3.scale.linear()
        .range([0, this.width]);

    this.y = d3.scale.linear()
        .range([this.height, 0]);

    this.xAxis = d3.svg.axis()
        .scale(this.x)
        .orient("bottom")

    this.area = d3.svg.area()
        .x(function(d, i) { return that.x(i); })
        .y0(this.height)
        .y1(function(d) { return that.y(d); });


      this.svg.append("g")
          .attr("class", "x axis");

    // call the update method
    this.updateVis();
}


/**
 * Method to wrangle the data. In this case it takes an options object
 * @param _filterFunction - a function that filters data or "null" if none
 */
AgeVis.prototype.wrangleData= function(_filterFunction){

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
AgeVis.prototype.updateVis = function(){

    // Dear JS hipster,
    // you might be able to pass some options as parameter _option
    // But it's not needed to solve the task.
    // var options = _options || {};


    // TODO: implement...
    // TODO: ...update scales
    // TODO: ...update graphs

      // updates scales
    this.x.domain([0, this.displayData.length]);
    this.y.domain([0, d3.max(this.displayData)]);

    // updates axis
    this.svg.select(".x.axis")
        .call(this.xAxis)
        .attr("transform", "translate(0,"+this.height+")")
        .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.6em")
            .attr("transform", function(d) { return "rotate(-90)" });;

    // updates graph
    var path = this.svg.selectAll(".area")
      .data([this.displayData])

    path.enter()
      .append("path")
      .attr("class", "area");

    path
      //.transition()
     // .attr("transform", "rotate(90,0,0),translate(0,-"+this.width+")")
      .attr("d", this.area);

    path.exit()
      .remove();



}


/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */
AgeVis.prototype.onSelectionChange= function (selectionStart, selectionEnd){
    that = this;

    // TODO: call wrangle function
   // console.log(selectionStart);
   // console.log(selectionEnd);

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
AgeVis.prototype.filterAndAggregate = function(_filter){


    // Set filter to a function that accepts all items
    // ONLY if the parameter _filter is NOT null use this parameter
    //Dear JS hipster, a more hip variant of this construct would be:
    var filter = _filter || function(){return true;}

    var that = this;
    
    var filtered_data = this.data.filter(filter);

    var max_age = d3.max(filtered_data.map(function(d) {return d.ages.length;}))
    
    // create an array of values for age 0-100 or bigger if available
    var res = d3.range(0, max_age).map(function (i) {
        return d3.sum(filtered_data.map(function(d) { return d.ages[i]; }));
    });



    // accumulate all values that fulfill the filter criterion
    return res;

}




