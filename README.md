# Charlotte Parks & Recreation

##Background

We’re a team of immigrés to Charlotte and we wanted to use this project to get to know our adopted
city a little better. We decided to explore Charlotte Parks and Recreation because of our mutual love
for green spaces. We wanted to understand the availability to parks in different areas of Charlotte,
what those parks are used for (walking, biking, picnicking, etc.), whether there is a correlation between
park access and affluency, and what recreational events are available to the public.

##Data

Data was obtained through data.charlotte.gov, specifically the Parks file.  To obtain the population, 
we identified a file from zipatlas.com, which included the population of the Charlotte Metro region by zip code.  
Regarding the population data – the most recent information on this site was from 2010. Although population grew
by just over 20%, we opted to keep the data true to the source.  Information from these sites was extracted by downloading to
csv files. 

Additionally, the Mecklenburg County Parks and Recreation website was utilized to scrape their spring activity list. 

##Database Creation

The team utilized Python/Pandas to pull in the 2 data sources.  Cleansing was performed to merge the data into 1 dataframe through
matching on zip code.  Several fields contained no data or not aligned to our analysis.  This data was removed from our dataframe.  
To meet project requirements, the python dataframes were transfered to a databases, all data headings needed to be renamed before loading 
to Postgres.

In the end our parks_db included 3 tables.  
* The parks table was created based upon the combination of parks information from Charlotte.gov and the zipatlas.com data as information within each record was closely related.  
* The events table was used to capture key events obtained through web-scraping. 
* The zipcode-coord table was created based upon data obtained from the geoJson.

Within the database - the zipcode and parks tables can be connected by zipcode now that a look up for each coordinate was completed (use of https://www.geocod.io/upload/).  
This site was also used to lookup and pinpoint the coordinate location for each of the parks (by using address).

##Flask API
Utilizing Flask, we were able to connect to the databases to assist in visual creation.  The Flask API connection also served as the landing page from which the visualizations and data analysis can be viewed and interacted with by the user.   

A seperate app.py file was created to facilitate the flask build-out.  This included importing dependencies to connect to our SQL databases and then loop through the databases ultimately creating dictionaries from which the data could be 
pulled by other team members to leverage in visualization creation.  

##HTML/CSS & Javascript
The initial HTML/CSS code was built as a shell with placehoders linked to Javascript files for team members to build out thier visualizations and apply 
consistant formatting and sizing using Bootstrap.  As the project advanced, the html/css styling was updated to ensure appropriate svg image sizing as the 
seperate javascript visualization files were completed.  Additionally, the html file was leveraged to incorporate analysis in paragraph form for each visualization. 
It was also used to mitigate challenges with Flask alignment. 

##Visualizations
The visualizations the team generated told the story of how the most densely populated zip codes in Charlotte have less access to public parks.  
Additionally, less densely populated areas with higher quantities of public parks are generally more affluent. 

###Family Population Density by Zip Code
The Family Population Density by Zip Code visualization used a geojson file to outline the borders of each zip code in the greater Charlotte metropolitan area. 
A heatmap was then overlayed to reflect areas with greater population density by linking with a choropleth javascript file.  Popups were then applied to reflect
the exact number of families in that area as per the census information which the user can access by clicking on a zip code. The visualization also includes zoom functionality. 

###Charlotte Parks: Satellite View
The Charlotte Parks: Satellite View pulled data from the Flask API database linkages to place markers on the exact park locations. The user can interact with 
the visualization by clicking on a marker which will then display the park name. This visualization also includes zoom functionality.  

###Park Quantity vs. Population Density
The Park Quantity vs. Population Density visualization is a bar chart which was created using the javascript D3 library.  The code first grouped the data by zip code and 
then pulled out both the population density and park quantity.  The outcome of this bar chart reinforced that zip codes with high population density do not have access to as 
many green spaces.  Additionally, it highlighted that areas where population is less dense and there are a higher number of parks tend to be in more affluent zip codes. 

###Charlotte Parks Spring Event List
The Charlotte Parks Spring Event List leveraged webscraping code from the Mecklenburg County Parks and Recreation website.  The scrape code was built out in Python
and pointed to the website's activites page.  From this page, the activity name and date of the activity or in the event the activity recurred, the starting date of the activity.
The activity list was then connected to an SQL database and then converted into an html table.  This table was then coded into the master html.  

##Instructions to Recreate the Charlotte Parks & Recreation Dashboard
*Leverage the files in the team's Github repository;
*Update the config file and the Beth.ipnyb with appropriate passwords;
*Create the database parks_db in PostGres/PGAdmin;
*Execute in PGAdmin the 3 sql files: 1) parks_db.sql 2) parks_ev_query.sql 3)zipcode_query.sql 
*Run Beth.ipnyb jupyter notebook file
*In Visual Studio run python app.py. and click on the corresponding url address.

The first five steps are completed only once. If you have already created the db with tables and want a full refresh then you need to drop the tables first.

##Team Members
*Kurt Dietrich
*Sarah Klein
*Beth Meyers
*Lauren Parrish
*Luis Rojas
