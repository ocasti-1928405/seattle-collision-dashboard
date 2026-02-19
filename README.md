I did not use AI to write or complete any restricted parts of this assignment. I utilized AI solely to better understand specific code methods and for minor code optimizations. I am prepared to explain my reasoning and the entire process used to create this work.

Link to map: https://ocasti-1928405.github.io/seattle-collision-dashboard/
# Seattle Vehicle Collisions Dashboard - 2023

## 1. Project Title and Objective
This interactive dashboard provides a real-time **spatial** analysis of vehicle collision patterns across Seattle using GeoJSON data to highlight high-risk areas. The dashboard updates dynamically based on the user's viewport to provide localized data insights through interactive map layers and synced visualizations.

## 2. Data Source
The primary geospatial dataset is the **"SDOT Collisions All Years"** layer sourced from the Seattle Open Data Portal. For this project, I specifically focused on collisions from the year 2023. The data was pre-filtered and exported as a GeoJSON file to optimize browser performance and ensure temporal relevance for current traffic safety analysis.

## 3. Thematic Map Justification
I chose to build a **Proportional Symbol Map** for this project rather than a choropleth map.
* **Preserving Precision:** A proportional symbol map preserves the precise geographic coordinates of each incident, which is critical for identifying specific dangerous intersections.
* **Dynamic Scaling:** I utilized a dynamic radius (using Mapbox's `interpolate` expression) to quantify the magnitude of each crash based on the number of vehicles involved.
* **Avoiding Aggregation Bias:** Unlike a choropleth map—which hides specific street-level details inside colored polygons—the proportional symbol approach reveals the exact corridors where accidents occur without losing detail to arbitrary administrative boundaries.

## 4. Interactive Visualizations
To satisfy the requirements for additional data components, I integrated two dynamic elements:
* **Dynamic Counter:** A text element that utilizes the `map.queryRenderedFeatures` function to calculate and display the exact number of collisions currently visible in the user's viewport.
* **C3.js Bar Chart:** A dynamic bar chart that provides a secondary level of data exploration. It automatically parses the `SEVERITYCODE` property of visible features to show a real-time breakdown of crash outcomes, ranging from property damage to serious injuries.

## 5. Libraries and Tools Used
* **Mapbox GL JS (v2.15.0):** The primary engine used for base map rendering and geospatial data visualization.
* **D3.js & C3.js:** Used to handle the reactive data processing and the rendering of the dynamic bar chart.
* **Bootstrap Icons:** Integrated for social media links and UI elements within the sidebar.
* **Google Fonts:** Used to implement the 'Titillium Web' and 'Oswald' typography for a clean, modern aesthetic.
