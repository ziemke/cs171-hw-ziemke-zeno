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
 * CountVis object for HW3 of CS171
 * @param _parentElement -- the HTML or SVG element (D3 node) to which to attach the vis
 * @param _data -- the data array
 * @param _metaData -- the meta-data / data description object
 * @param _eventHandler -- the Eventhandling Object to emit data to (see Task 4)
 * @constructor
 */
CountVis = function(_parentElement, _data, _metaData, _eventHandler){
    this.parentElement = _parentElement;
    this.data = _data;
    this.metaData = _metaData;
    this.eventHandler = _eventHandler;
    this.displayData = [];


    // TODO: define all "constants" here

    this.margin = {top: 20, right: 20, bottom: 30, left: 70},
    this.width = 650 - this.margin.left - this.margin.right,
    this.height = 330 - this.margin.top - this.margin.bottom;


    this.initVis();
}


/**
 * Method that sets up the SVG and the variables
 */
CountVis.prototype.initVis = function(){

    var that = this; // read about the this



    //TODO: implement here all things that don't change
    //TODO: implement here all things that need an initial status
    // Examples are:
    // - construct SVG layout
    // - create axis
    // -  implement brushing !!
    // --- ONLY FOR BONUS ---  implement zooming

    // TODO: modify this to append an svg element, not modify the current placeholder SVG element

    this.svg = this.parentElement.append("svg")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.svg.append("text")
        .attr("class", "vis_label")
        .text("Number of votes -- scroll to zoom, brush to select range:")
        .attr("x", 5)
        .attr("y", -5)


    this.brush_labels = [] 

    this.brush_labels.push(this.svg.append("text")
      .attr("class", "brush_label"))

    this.brush_labels.push(this.svg.append("text")
      .attr("class", "brush_label"))


    //TODO: implement the slider -- see example at http://bl.ocks.org/mbostock/6452972
    this.addSlider(this.parentElement.select("svg"));


    // filter, aggregate, modify data
    this.wrangleData();



    this.x = d3.time.scale()
        .range([0, this.width]);

    this.y = d3.scale.pow()
        .exponent(0.01)
        .range([this.height, 0]);

    this.xAxis = d3.svg.axis()
        .scale(this.x)
        .orient("bottom");

    this.yAxis = d3.svg.axis()
        .scale(this.y)
        .orient("left");

    this.area = d3.svg.area()
        .x(function(d) { return that.x(d.time); })
        .y0(this.height)
        .y1(function(d) { return that.y(d.count); });


    this.brush = d3.svg.multibrush(this.eventHandler)
      .on("brush", function(){
          $(that.eventHandler).trigger("selectionChanged", that.brush);
      })
      .on("clear", function() {
        $(that.eventHandler).trigger("selectionChanged", that.brush);
      });

      this.brush.resizeAdaption(
          function (selection) {
            selection.select("rect").attr("height", that.height);
          }
        );

      this.brush.extentAdaption(
        function (selection, i) {
            selection.attr("height", that.height);
            selection.append("text").text("brush " + i);

          }
        );

      this.svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + this.height + ")")
          .call(this.xAxis);

      this.svg.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(0,0)")
          .call(this.yAxis)

    this.svg.append("g")
      .attr("class", "brush");

    /*this.plot = this.svg.append("rect")
      .attr("width", this.width)
      .attr("height", this.height)
      .style("fill", "#EEEEEE")
      .attr("pointer-events", "all")
     // .on("mousedown.drag", self.plot_drag())
     // .on("touchstart.drag", self.plot_drag())
      this.plot.call(d3.behavior.zoom().x(this.x).y(this.y).on("zoom", function() {that.updateVis(); console.log("zoom"); }));
    */

    // call the update method
    this.updateVis();
}



/**
 * Method to wrangle the data. In this case it takes an options object
  */
CountVis.prototype.wrangleData= function(){

    // displayData should hold the data which is visualized
    // pretty simple in this case -- no modifications needed
    this.displayData = this.data;

}



/**
 * the drawing function - should use the D3 selection, enter, exit
 * @param _options -- only needed if different kinds of updates are needed
 */
CountVis.prototype.updateVis = function(){
 // updates scales
    this.x.domain(d3.extent(this.displayData, function(d) { return d.time; }));
    this.y.domain(d3.extent(this.displayData, function(d) { return d.count; }));

    // updates axis
    this.svg.select(".x.axis")
        .call(this.xAxis);

    this.svg.select(".y.axis")
        .call(this.yAxis)

    // updates graph
    var path = this.svg.selectAll(".area")
      .data([this.displayData])

    path.enter()
      .append("path")
      .attr("class", "area");

    path
      //.transition()
      .attr("d", this.area);


//      path.call(d3.behavior.zoom().x(this.x).y(this.y).on("zoom", this.updateVis()));

    path.exit()
      .remove();

    this.brush.x(this.x);
    this.svg.select(".brush")
        .call(this.brush)
      .selectAll("rect")
        .attr("height", this.height);
   }

/**
 * Gets called by event handler and should create new aggregated data
 * aggregation is done by the function "aggregate(filter)". Filter has to
 * be defined here.
 * @param selection
 */
CountVis.prototype.onSelectionChange= function (ranges){

    that = this;
    // TODO: call wrangle function
    d3.selectAll(".brush_label").text("");
 
      ranges.forEach(function(r, i) {

        that.brush_labels[i]
          .text("Brush " + (i+1))
          .attr("y", 15)
          .attr("x", (that.x(r[0]) + that.x(r[1])) /2)
      });
    


}


/*
 *
 * ==================================
 * From here on only HELPER functions
 * ==================================
 *
 * */

 var getInnerWidth = function(element) {
        var style = window.getComputedStyle(element.node(), null);

        return parseInt(style.getPropertyValue('width'));
    }


 var getInnerHeight = function(element) {
        var style = window.getComputedStyle(element.node(), null);

        return parseInt(style.getPropertyValue('height'));
    }


/**
 * creates the y axis slider
 * @param svg -- the svg element
 */
CountVis.prototype.addSlider = function(svg){
    var that = this;

    // TODO: Think of what is domain and what is range for the y axis slider !!
    var sliderScale = d3.scale.linear().range([0,200]).domain([0.01,1])

    var sliderDragged = function(){
        var value = Math.max(0, Math.min(200,d3.event.y));

        var sliderValue = sliderScale.invert(value);

        that.y.exponent(sliderValue);

        // TODO: do something here to deform the y scale
        console.log("Y Axis Slider value: ", sliderValue);


        d3.select(this)
            .attr("y", function () {
                return sliderScale(sliderValue);
            })

        that.updateVis({});
    }
    var sliderDragBehaviour = d3.behavior.drag()
        .on("drag", sliderDragged)

    var sliderGroup = svg.append("g").attr({
        class:"sliderGroup",
        "transform":"translate("+0+","+30+")"
    })

    sliderGroup.append("rect").attr({
        class:"sliderBg",
        x:5,
        width:10,
        height:200
    }).style({
        fill:"lightgray"
    })

    sliderGroup.append("rect").attr({
        "class":"sliderHandle",
        y:0,
        width:20,
        height:10,
        rx:2,
        ry:2
    }).style({
        fill:"#333333"
    }).call(sliderDragBehaviour)

}





