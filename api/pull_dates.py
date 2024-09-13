import requests
import sqlite3
import json
import re
from datetime import datetime

suburbs = ["Acacia Ridge",
           "Albion",
           "Alderley",
           "Algester",
           "Annerley",
           "Anstead",
           "Archerfield",
           "Ascot",
           "Ashgrove",
           "Aspley",
           "Auchenflower",
           "Bald Hills",
           "Balmoral",
           "Banyo",
           "Bardon",
           "Bellbowrie",
           "Belmont",
           "Boondall",
           "Bowen Hills",
           "Bracken Ridge",
           "Bridgeman Downs",
           "Brighton",
           "Brisbane City",
           "Brookfield",
           "Bulimba",
           "Burbank",
           "Calamvale",
           "Camp Hill",
           "Cannon Hill",
           "Carina",
           "Carina Heights",
           "Carindale",
           "Carseldine",
           "Chandler",
           "Chapel Hill",
           "Chelmer",
           "Chermside",
           "Chermside West",
           "Chuwar",
           "Clayfield",
           "Coopers Plains",
           "Coorparoo",
           "Corinda",
           "Darra",
           "Deagon",
           "Doolandella",
           "Drewvale",
           "Durack",
           "Dutton Park",
           "East Brisbane",
           "Eight Mile Plains",
           "Ellen Grove",
           "Enoggera",
           "Enoggera Reservoir",
           "Everton Park",
           "Fairfield",
           "Ferny Grove",
           "Fig Tree Pocket",
           "Fitzgibbon",
           "Forest Lake",
           "Fortitude Valley",
           "Gaythorne",
           "Geebung",
           "Gordon Park",
           "Graceville",
           "Grange",
           "Greenslopes",
           "Gumdale",
           "Hamilton",
           "Hawthorne",
           "Heathwood",
           "Hemmant",
           "Hendra",
           "Herston",
           "Highgate Hill",
           "Holland Park",
           "Holland Park West",
           "Inala",
           "Indooroopilly",
           "Jamboree Heights",
           "Jindalee",
           "Kalinga",
           "Kangaroo Point",
           "Karana Downs",
           "Karawatha",
           "Kedron",
           "Kelvin Grove",
           "Kenmore",
           "Kenmore Hills",
           "Keperra",
           "Kholo",
           "Kuraby",
           "Lake Manchester",
           "Larapinta",
           "Lota",
           "Lutwyche",
           "Lytton",
           "Macgregor",
           "Mackenzie",
           "Manly",
           "Manly West",
           "Mansfield",
           "McDowall",
           "Middle Park",
           "Milton",
           "Mitchelton",
           "Moggill",
           "Moorooka",
           "Morningside",
           "Mt Crosby",
           "Mt Gravatt",
           "Mt Gravatt East",
           "Mt Ommaney",
           "Murarrie",
           "Nathan",
           "New Farm",
           "Newmarket",
           "Newstead",
           "Norman Park",
           "Northgate",
           "Nudgee",
           "Nudgee Beach",
           "Nundah",
           "Oxley",
           "Paddington",
           "Pallara",
           "Parkinson",
           "Petrie Terrace",
           "Pinjarra Hills",
           "Pinkenba",
           "Pullenvale",
           "Ransome",
           "Red Hill",
           "Richlands",
           "Riverhills",
           "Robertson",
           "Rochedale",
           "Rocklea",
           "Runcorn",
           "Salisbury",
           "Sandgate",
           "Seven Hills",
           "Seventeen Mile Rocks",
           "Sherwood",
           "Shorncliffe",
           "Sinnamon Park",
           "South Brisbane",
           "Spring Hill",
           "St Lucia",
           "Stafford",
           "Stafford Heights",
           "Stones Corner",
           "Stretton",
           "Sumner",
           "Sunnybank",
           "Sunnybank Hills",
           "Taigum",
           "Taringa",
           "Tarragindi",
           "Teneriffe",
           "Tennyson",
           "The Gap",
           "Tingalpa",
           "Toowong",
           "Upper Brookfield",
           "Upper Kedron",
           "Upper Mt Gravatt",
           "Virginia",
           "Wacol",
           "Wakerley",
           "Wavell Heights",
           "West End",
           "Westlake",
           "Willawong",
           "Wilston",
           "Windsor",
           "Wishart",
           "Woolloongabba",
           "Wooloowin",
           "Wynnum",
           "Wynnum West",
           "Yeerongpilly",
           "Yeronga",
           "Zillmere"
          ]

connection = sqlite3.connect('database.db')
cur = connection.cursor()

# Last run 
last_run_sql = "UPDATE datefetches SET updated = CURRENT_TIMESTAMP WHERE id = 1"
cur.execute(last_run_sql)
connection.commit()

for suburb in suburbs:
  url = 'https://www.brisbane.qld.gov.au/clean-and-green/rubbish-tips-and-bins/rubbish-collections/kerbside-large-item-collection-service'

  headers = {
      'accept': 'application/json, text/javascript, */*; q=0.01',
      'accept-language': 'en-AU,en-GB;q=0.9,en-US;q=0.8,en;q=0.7',
      'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      # 'cookie': 'at_check=true; AMCVS_473852FF5BECE3360A495E7C%40AdobeOrg=1; AMCV_473852FF5BECE3360A495E7C%40AdobeOrg=179643557%7CMCIDTS%7C19976%7CMCMID%7C47457035631270782346277008052861557945%7CMCOPTOUT-1725938417s%7CNONE%7CvVersion%7C5.5.0; mbox=PC#62338bf073714043b8f25915c0e188c1.36_0#1789176018|session#5338fac48dce49daa26b736f3047a222#1725933078',
      'origin': 'https://www.brisbane.qld.gov.au',
      'priority': 'u=1, i',
      'referer': 'https://www.brisbane.qld.gov.au/clean-and-green/rubbish-tips-and-bins/rubbish-collections/kerbside-large-item-collection-service',
      'sec-ch-ua': '"Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"Windows"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
      'x-requested-with': 'XMLHttpRequest',
  }

  params = {
      'ajax_form': '1',
      '_wrapper_format': [
          'drupal_ajax',
          'drupal_ajax',
      ],
  }

  data = {
      'suburb': suburb,
      'collection_starts_week_commencing': '<br>\r\n    - Select your suburb -\r\n',
      'form_build_id': 'form-x8rE5hBvPn2VySK96W4getQu9Z01WmuY2dXioZZmhjY',
      'form_id': 'webform_submission_kerbside_collection_search_node_28246_add_form',
      '_triggering_element_name': 'webform-computed-collection_starts_week_commencing-button',
      '_triggering_element_value': 'Update',
      '_drupal_ajax': '1',
      'ajax_page_state[theme]': 'bcc_theme',
      'ajax_page_state[theme_token]': '',
      'ajax_page_state[libraries]': 'eJyFkAFuwyAMRS-UwJEi47iE1uAMm667_ehaaWxrNAmB__P_MhAQF9sokw-Al9mkr30K37QSrFhbDi-hjrSZSRlAZAnAA8hkMEhNK80FriPKIrbNilV4TKpgAp45lYtOuIlS8WttO7B7qCdcOAX_KB1qt0oln4pRLd16fmtUP9xJap6iSGRaDKKPffutHZzh9hPm6Z3CPeufpyPudyvmUPLejNZDw9ofnlidwpX-NZnEPvTQdmK6Bbkd9jOpQjzOay_Q_rS_PuUVdNpCTrZIQfoEAVTWng',
  }

  response = requests.post(
      url,
      params=params,
      headers=headers,
      data=data,
  )

  if response.status_code == 200:
    print("Request successful")
    date = re.search("\d{1,2}\s\w+\s\d{4}", response.text)
    print(date.group())
    date_str = date.group()
    date_obj = datetime.strptime(date_str, "%d %B %Y")
    formatted_date = date_obj.strftime("%Y/%m/%d")


    sql = "INSERT OR REPLACE INTO kerbside (id, updated, suburb, kerbside_week) VALUES ((SELECT id FROM kerbside WHERE suburb = '{s}'),CURRENT_TIMESTAMP,'{s}','{d}')".format(s=suburb, d=formatted_date)
    print(sql)
    cur.execute(sql)
    connection.commit()
  else:
    print(response.text)




connection.commit()
connection.close()