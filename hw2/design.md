Design Description
=======
Usage
-----------
My design studio implementation focuses on improving the visual representation of the data, reducing complexity and providing new options to gain insight into the data.  


In addition to the data from the example, my implementation calculates the average proximity between a country and its trade partners, which allows to the user to analyse how this relates to a country's GDP/Tradepartners/Population etc.  

The width of the links for the trade data represent the magnitude of the exports from a country to another, to make this information easily recognizable. This was more difficult to implement than I expected, because of outliers (e.g. USA for GDP, China for population). I solved this using a logarithmic scale.

The user can group the countries by continent, population, GDP and average trade partner proximity. For all quantitative values the countries are sorted into groups containing countries with small, medium and high values of the selected field. These groupes are represented by circles. The radius of the circle adjusts automatically to the number of countries within that group, taking into account that this relationship is not linear.  
I first used a quantile scale to automatically generate cut-offs for grouping the data, but later decided to use pre-set thresholds instead. The reason is that this way, the sizes of the groups change when adjusting the selected year, which makes it easier to see, how the constellation of the group changed. (Before the groups sizes would always stay roughly the same).

Tradelinks between countries from a group and between countries from different groups are colored differently, which allows the user to quickly see, how high trade relations are correlated with the membership of a group.
In order to implement this function and to reduce the visual complexity, I implemented the bundle layout using one magnet in the center of the visualization for trade links between countries from different groups plus one magnet in the center of each group for trade links between countries that belong to a group.

You can use the aforementioned fields to sort the countries while maintaining the grouping.  Furthmore yo can visualize up to three of the aforementioned variables at the same  time, by visualizing them using grouping, sorting and the size of the nodes. This allows the user to easily see connections between different variables and also allows to analyze how they relate to trade behaviour of different countries.

Furthermore it can be analyzed how the data and relationships developed over time by using the year selector widget.

To further improve the visualization the labels that previously were overlapping are rotated and arranged around the outside of the circles.

To further improve the accessibility and readability of the data, the user can activate tooltips, which display relevant information in textform, when hovering over a country.

Because of the amount of links beeing drawn and the processing intensity of the bundle layout, transitions that involved dynamically adjusting the x/y coordinations of the links were not smooth. Also directly transitioning the labels was tricky since the are being rotated. Therefore I implemented a multi staged transition, where the labels are rotated so that they are "straight", moved to the new position and rotated back. The different types of links are blended in and out one after another.

It is intended for policy makers, who want to get an understanding for how the selection of trade partners is related to geographical proximity, GDP, etc. and how this has changed over time.

There is an issue, that parts of the visualiazation can be cut of, when its too big. I fixed this for the group labels, by placing them at the upper most/lower most position if they are out of bounds. But after spending more than 60h on this problemset I unfortuantely did not have time to fix this issue for the circles.

I also wanted to implement an option where you could click on a country, the highlighting of this country and its tradelinks would stay until you click somewhere else. Combined with x/y transitions for the trading links, this would have made it even easier to analyze how trade relationship for a specific country change over time.

Pictures of the process of implementing the homework can be found in the /design/ folder together with an alternative design.