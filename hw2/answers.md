HW 2
=======
Question 0.1. What is the meaning of the horizontal and vertical position of the nodes? Give examples of datasets particularly well suited to organize data this way.
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