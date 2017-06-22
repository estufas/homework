import csv
import collections

plans = {}
rate_areas = {}
slcsp = collections.OrderedDict()
zips = {}

with open('slcsp.csv') as fin:
    reader = csv.DictReader(fin)
    for row in reader:
        rate_and_rate_area = {}
        rate_and_rate_area['rate'] = row['rate']
        rate_and_rate_area['rate_area'] = ''
        slcsp[row['zipcode']] = rate_and_rate_area

with open('zips.csv') as fin:
    reader=csv.DictReader(fin)
    for row in reader:
        if row['zipcode'] in slcsp:
            zips[row['zipcode']] = row
            slcsp[row['zipcode']]['rate_area'] = row['rate_area']
            slcsp[row['zipcode']]['state'] = row['state']

for key in zips:
    if zips[key]['rate_area'] in rate_areas:
        rate_areas[zips[key]['rate_area']][zips[key]['zipcode']] = zips[key]['rate_area']
    else:
        list_of_zip = {}
        list_of_zip[zips[key]['zipcode']] = zips[key]['rate_area']
        rate_areas[zips[key]['rate_area']] = list_of_zip

with open('plans.csv') as fin:
    reader = csv.DictReader(fin)
    for row in reader:
        if row['rate_area'] in rate_areas and row['metal_level'] == 'Silver':
            if row['rate_area'] in plans:
                if row['state'] in plans[row['rate_area']]:
                    if float(plans[row['rate_area']][row['state']]) > float(row['rate']):
                        plans[row['rate_area']][row['state']] = row['rate']
                else:
                    plans[row['rate_area']][row['state']] = row['rate']
            else:
                states = {}
                states[row['state']] = row['rate']
                plans[row['rate_area']] = states

for key in slcsp:
    state = slcsp[key]['state']
    rate_area = slcsp[key]['rate_area']
    if rate_area in plans and state in plans[rate_area]:
        slcsp[key] = plans[rate_area][state]
    else:
        slcsp[key] = ''

with open('slcsp.csv', 'wb') as csv_file:
    writer = csv.writer(csv_file)
    csv_file.write('zipcode,rate\n')
    for key, value in slcsp.items():
        writer.writerow([key, value])
