# Answers for Questions

### Q3a
**Question:** Name the HTML element (type and class) that represents the interactive area.

-
A rect with class "background" represents the interactive area. It has the same dimensions as the area on which the visualized data is beeing drawn. Thus it acts as an overlay.

### Q3b
**Question:** Name the HTML element (type and class) that is used for representing the brushed selection.

-
A rect with class "extent" represents the brushed selection.

### Q3c
**Question:** What do the other DOM elements of brush represent? 
-
For the left and the right side of the brush selection there is a group element with class "resize" that contains a rect. This is used to make the sides of the brush selection selectable. Selecting these side rects allows the user to resize the brush selection. Hovering over the rects will turn the cusor into a resize cursor.