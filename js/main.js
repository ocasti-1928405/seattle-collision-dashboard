mapboxgl.accessToken = 'pk.eyJ1Ijoib2Nhc3RpIiwiYSI6ImNtaGJlcHR0bzBkbHEyam9hZjUxdTN2em8ifQ.1dlbHGkcsfz7UDrymlleLA';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v11',
    zoom: 10.5,
    minZoom: 9,
    center: [-122.3321, 47.6062]
});


map.on('load', () => {
    
    // Add the GeoJSON file as a data source
    map.addSource('collisions', {
        type: 'geojson',
        data: 'data/collisions.geojson' 
    });

    // Add the layer to draw the data as proportional circles
    map.addLayer({
        'id': 'collisions-point',
        'type': 'circle',
        'source': 'collisions',
        'paint': {
            'circle-radius': [
                'interpolate',
                ['linear'],
                ['get', 'VEHCOUNT'], 
                0, 3,                
                1, 4,                
                2, 6,                
                4, 12,               
                8, 20                
            ],
            'circle-color': '#ff7e67', 
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 0.5,
            'circle-opacity': 0.7
        }
    }); 

    // Initialize the Bar Chart
    let chart = c3.generate({
        bindto: '#collision-chart',
        data: {
            columns: [
                ['Property Damage', 0],
                ['Injury', 0],
                ['Serious/Fatal', 0],
                ['Unknown', 0]
            ],
            type: 'bar',
            colors: {
                'Property Damage': '#ffb3a7',
                'Injury': '#ff7e67',
                'Serious/Fatal': '#cc0000',
                'Unknown': '#cccccc'
            }
        },
        axis: {
            x: { show: false } 
        },
        legend: {
            position: 'bottom'
        }
    });

    // Create the function that counts the visible points
    function updateSidebar() {
        
        const visibleFeatures = map.queryRenderedFeatures({ layers: ['collisions-point'] });
        
        // Update the big orange number in the sidebar
        document.getElementById('collision-count').innerText = visibleFeatures.length;

        // Tally up the severities for the chart
        let propDamage = 0, injury = 0, seriousFatal = 0, unknown = 0;

        visibleFeatures.forEach(feature => {
            const severity = feature.properties.SEVERITYCODE; 
            if (severity === '1') propDamage++;
            else if (severity === '2') injury++;
            else if (severity === '2b' || severity === '3') seriousFatal++;
            else unknown++;
        });

        // Push data to the C3 chart
        chart.load({
            columns: [
                ['Property Damage', propDamage],
                ['Injury', injury],
                ['Serious/Fatal', seriousFatal],
                ['Unknown', unknown]
            ]
        });
    }

    // Fire the update function whenever the user stops moving or zooming the map
    map.on('idle', updateSidebar);

}); 