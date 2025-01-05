# Aibnb advanced reseach 

## Description

This short script _airbnb-advanced search.mjs_ as been written to fill the need to search for hosting nearby train stations. 

## How does it work ? 
1. Searching hosting from Airbnb website with some specifics inputs such as general localisation (region, country) and dates provides an url with usefull parameters. 
2. The script searches for all the avaliable hostings returned with this url, looping over the pages. 
3. Only requiered data is kept (data cleaning)
4. The localisation of each and every hosting is compared to the localisation of train stations (data from XXXXX). 
5. Only the hosting within a defined maximum distance from a train station is kept.
6. Additional filters can be made on the data such as price or rating. 