# Import dependencies
from splinter import Browser
from bs4 import BeautifulSoup as bs
from webdriver_manager.chrome import ChromeDriverManager
from flask import Flask, render_template, redirect

def init_browser():
    executable_path = {'executable_path': ChromeDriverManager().install()}
    return Browser('chrome', **executable_path, headless=False)

def scrape():
    browser = init_browser()
    #Option 1 create a dictionary to go onto website
    # park_event_dict = {}

    # Scraped park events from Charlotte Parks Website
    url = 'https://anc.apm.activecommunities.com/mecklenburgparks/activity/search?onlineSiteId=0&activity_select_param=2&viewMode=list/'
    browser.visit(url)
    html = browser.html
    soup = bs(html, 'html.parser')
    activities = soup.find_all('div', class_='activity-card-info__name')

    # Loop through and store Park Events
    events = []

    for activity in activities:
        title = activity .find('h3').text
       
        events.append(title)
    
    for time in times:
        dates = time.find('span').text  
        events.append(dates)

    # For Option 1 - Create the dictionary of all above scraped data to facilitate coversion
    # park_event_dict = {
    #     "Park_Events": events}
    
    #Option 2 - Create a list of dictionaries for display in website
    eventsList = [{"Park_Events": events}]
    # print(eventList)

    # Close the browser after scraping
    browser.quit()

    # Return results Option 1
    # return park_event_dict

    # Return results Option 2
    return eventsList
