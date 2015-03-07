HW 2
=======
Question 0.1. 
-----------
The horizontal and vertical positions are calculated by a physical simulation which assumes that the nodes repulse each other and at the same time are kept togethers by the links connecting them. The specific values are influenced by the parameters charge (strength of repulsive force), friction (velocity delay), alpha (cooling factor) and link strength.  
This layout is especially suited to visualize connections between datapoints, when the strengths/distance of the connections vary.  
Suited datasets include:
- social network data (e.g. facebook): nodes = persons, length of links = "closeness" of friendship measured by engagement on facebook  
- geographical data, i.e. how far are trade partners away from each other (only works for smaller data sets, since for bigger datasets, the variety in link sizes will make the nodles "cluster" together into a ball.)
- trade data, use the links to show the trade volumne between countries
- linguistic data: node=a single word, links=how often the word is used in conjuction with the other word
- family trees


The example contains the option to change the layout and graphical properties encoded (in this case, either 'Color' or 'Size'). Use your mouse to click on those options and observe the change.

Question 0.2.
-----------
Texture, orientation, shape, value (change from light to dark for black & white), saturation [Source](http://krygier.owu.edu/krygier_html/geog_353/geog_353_lo/geog_353_lo08.html)

Question 0.3. 
-----------
No, they are not all indepdent.  
Dependant:
- if I choose a circle as shape for a  node, I can no longer use orientation with that node.  
- if I use value (black/white) for a node I can no longer apply color or hue as variables.

Independant:
- color and size for a node (see example for this HW)
- color and shape for a node 
- color and orientation for a node

Question 1.1. Discuss the pros and cons of the two types of rankings (either by relative or absolute position between nodes).
-----------
pro/con absolute:  
- +people are used to this layout, so they can immediately understand it (if the titles says sorted by X)
- +it uses the available space without efficiently (relative position can take up alot of space)
- -it shows less information (because we can not use distances between nodes as visual variable)

pro/con relative:
+ +you can use the distances between line items to convey information (how big the difference in GDP is)
- -the readability can be impacted if there is overlap between items

Question 1.2. 
-----------
Quantitatively data is best suited because their measurements of maginatude can be compared and translated to the x/y position of the nodes on the scatter plot.  (position products according to price & quality, position companies according to maturity of the market and market share)  
Categorical Data is not suited because we only know if it belongs to a category or not. there are no relationships between items or between categories that we could translate to x/y position on the scatter plot.    
For ordinal data we could theoretically use the scatterplot, to position different groups on different x/y position on the scatterplot depending on the measuremts of magnitude of the different groups. (Groups countries by continent and position continents according to longitudte/latidtude, group countries by high/low/medium GDP and position them according to the difference in the mean GDP per group)

Question 2.1. 
-----------
Pro:
- saves time because we can use preimplemented mechanisms for positiong items (i.e. circles given specific angle, tree structures etc.)
- makes it easier to work in teams, if the team member have a common skills i.e. they know how to use the D3 layout
- Many D3 Layouts already incorporate design best practices (for example spacing between elements in three structures,)

Con:
- the can be not flexible enough if we want to implement more complex visualizations
- they are not easy to extend/its hard to modify their behavior or to add functions without changing code in the d3 library 
- if something goes wrong or the layout does not act as we wish, it can be hard to find the issue, since we dont fully understand how the d3 layout works internaly

Question 3.1. 
-----------
1) One problem is that a lot of nodes and links are shown at the same time => Functionality to "zoom in" on parts of the visualition. I.e. only display one continent at a time so that it takes up the whole screeen.  

2) Since the visualization is so complex and filled with data, there is also a lot of overlap between elements like lines or text. One can improve the position of the items. For example a lot of the labels overlap and therefore could be rotated an arranged around the outerside of the circle, so that they are all easier to read.  

3) Given that there are so many lines on the screen, that are connected to many different countries, it is also difficult to see for example which the top trade partners of a country are and how they stack up. This is even the case after implementing the rollover effect as requried by this homework. To make this information easier to access a strategy would be to add a separate textbox next to the visualization or tooltips, that display the aforementioned information in text form, whenever you hover over/select a country.

