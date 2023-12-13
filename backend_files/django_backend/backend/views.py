import json
from django.db import connection
from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from django.views.decorators.http import require_POST
import datetime
import random


def test_mysql(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM Crimes")
        rows = cursor.fetchall()

    response = '\r\n'.join([str(row) for row in rows])

    return HttpResponse(response)


@require_GET
def search_crime_type(request):
    response = {}
    query = request.GET.get('type')
    print(query)
    if not query:
        return HttpResponse({'No search query provided.'})
    # assuming crime_type is the field to search
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM Events WHERE CrimeType LIKE %s", [query])
        rows = cursor.fetchall()
        if len(rows) == 0:
            return HttpResponse({'No results found.'})

    results = []
    for row in rows:
        result = {
            'eventid': row[0],
            'datereported': row[1],
            'dateoccurred': row[2],
            'area_name': row[3],
            'location': row[4],
            'crime_type': row[5]
        }
        results.append(result)

    return JsonResponse({'results': results})


@require_GET
def crimes_eventid(request):
    response = {}
    query = request.GET.get('eventid')
    print(query)
    if not query:
        return HttpResponse({'No search query provided.'})
    # assuming crime_type is the field to search
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM Events WHERE EventID LIKE %s", [query])
        rows = cursor.fetchall()
        if len(rows) == 0:
            return HttpResponse({'No results found.'})

    results = []
    for row in rows:
        result = {
            'eventid': row[0],
            'datereported': row[1],
            'dateoccurred': row[2],
            'area_name': row[3],
            'location': row[4],
            'crime_type': row[5]
        }
        results.append(result)

    return JsonResponse({'results': results})


@require_GET
def crimes_date(request):
    response = {}
    query = request.GET.get('date')
    print(query)
    if not query:
        return HttpResponse({'No search query provided.'})
    # assuming crime_type is the field to search
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM Events WHERE DateReported LIKE %s", [query])
        rows = cursor.fetchall()
        if len(rows) == 0:
            return HttpResponse({'No results found.'})

    results = []
    for row in rows:
        result = {
            'eventid': row[0],
            'datereported': row[1],
            'dateoccurred': row[2],
            'area_name': row[3],
            'location': row[4],
            'crime_type': row[5]
        }
        results.append(result)

    return JsonResponse({'results': results})


@require_GET
def crimes_area(request):
    response = {}
    query = request.GET.get('area')

    if not query:
        return HttpResponse({'No search query provided.'})
    # assuming crime_type is the field to search
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM Events WHERE AreaName LIKE %s", [query])
        rows = cursor.fetchall()
        if len(rows) == 0:
            return HttpResponse({'No results found.'})

    results = []
    for row in rows:
        result = {
            'eventid': row[0],
            'datereported': row[1],
            'dateoccurred': row[2],
            'area_name': row[3],
            'location': row[4],
            'crime_type': row[5]
        }
        results.append(result)

    return JsonResponse({'results': results})


@require_GET
def victims_by_district(request):
    response = {}

    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT e.AreaName, COUNT(v.VictimID) AS num_victims \
             FROM Events e \
             JOIN Victims v ON e.EventID = v.EventID \
             GROUP BY e.AreaName"
        )
        rows = cursor.fetchall()

    response = '\r\n'.join([str(row) for row in rows])

    return HttpResponse(response)


@require_GET
def crime_type_in_hollywood(request):
    response = {}

    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT e.AreaName, e.CrimeType, COUNT(DISTINCT v.VictimID) AS num_unique_victims \
             FROM Events e JOIN Victims v ON e.EventID = v.EventID \
             WHERE e.AreaName = 'Hollywood' AND v.Age BETWEEN 18 AND 30 \
             GROUP BY e.CrimeType"
        )
        rows = cursor.fetchall()

    response = '\r\n'.join([str(row) for row in rows])

    return response


def check_int(element):
    try:
        int(element)
        return 0
    except ValueError:
        return 1


def check_datetime(element, date_format):
    try:
        datetime.datetime.strptime(element, date_format)
        return 1
    except ValueError:
        return 0


@require_GET
def crimes_report(request):
    crime_type = request.GET.get('crime_type')
    date_occurred = request.GET.get('date_occurred')
    date_reported = request.GET.get('date_reported')
    area_name = request.GET.get('area_name')
    street_name = request.GET.get('street_name')

    # check data format is correct or not
    if check_int(crime_type):
        return HttpResponse({'Invalid crime type.'})

    if area_name == None:
        return HttpResponse({'Invalid area name.'})

    if street_name == None:
        return HttpResponse({'Invalid street name.'})

    if check_datetime(date_occurred, '%Y-%m-%d') == 0:
        return HttpResponse({'Invalid date occurred.'})

    if check_datetime(date_reported, '%Y-%m-%d') == 0:
        return HttpResponse({'Invalid date reported.'})

    event_id = random.randint(1, 1000000000)

    # check data is in the database or not
    # check area name is in the database or not
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM Locations WHERE AreaName LIKE %s", [area_name])
        rows = cursor.fetchall()
        if len(rows) == 0:
            return HttpResponse({'Area name not found.'})

    # check crime type is in the database or not
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM Crimes WHERE CrimeType LIKE %s", [crime_type])
        rows = cursor.fetchall()
        if len(rows) == 0:
            return HttpResponse({'Crime type not found.'})

    # generate random event id

    # insert data into database in the table "Events"
    with connection.cursor() as cursor:
        # print("execute")
        # close foreign key check
        cursor.execute("SET FOREIGN_KEY_CHECKS=0")
        cursor.execute(
            "INSERT INTO Events(EventID, DateReported, DateOccur, AreaName, StreetName, CrimeType) \
            VALUES (%s, '%s', '%s', '%s', '%s', %s)" % (event_id, date_reported, date_occurred, area_name, street_name, crime_type))
        # open foreign key check
        cursor.execute("SET FOREIGN_KEY_CHECKS=1")

    # get the updated IsDangerous status of the related district
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT IsDangerous FROM Locations WHERE AreaName LIKE %s", [area_name])
        rows = cursor.fetchall()
        if len(rows) > 0:
            is_dangerous = rows[0][0]
        else:
            is_dangerous = False

    # return success message, event id, and the IsDangerous status
    return HttpResponse(f'Event reported with EventID: {event_id}. IsDangerous: {is_dangerous}')


@require_GET
def crimes_update(request):
    event_id = request.GET.get('id')
    crime_type = request.GET.get('crime_type')
    date_occurred = request.GET.get('date_occurred')
    date_reported = request.GET.get('date_reported')
    area_name = request.GET.get('area_name')
    street_name = request.GET.get('street_name')

    # check data format is correct or not
    if check_int(event_id):
        return HttpResponse({'Invalid event id.'})

    if check_int(crime_type):
        return HttpResponse({'Invalid crime type.'})

    if area_name == None:
        return HttpResponse({'Invalid area name.'})

    if street_name == None:
        return HttpResponse({'Invalid street name.'})

    if check_datetime(date_occurred, '%Y-%m-%d') == 0:
        return HttpResponse({'Invalid date occurred.'})

    if check_datetime(date_reported, '%Y-%m-%d') == 0:
        return HttpResponse({'Invalid date reported.'})

    # check data is in the database or not
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM Events WHERE EventID LIKE %s", [event_id])
        rows = cursor.fetchall()
        if len(rows) == 0:
            return HttpResponse({'Event id not found.'})

    # check area name is in the database or not
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM Locations WHERE AreaName LIKE %s", [area_name])
        rows = cursor.fetchall()
        if len(rows) == 0:
            return HttpResponse({'Area name not found.'})

    # check crime type is in the database or not
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM Crimes WHERE CrimeType LIKE %s", [crime_type])
        rows = cursor.fetchall()
        if len(rows) == 0:
            return HttpResponse({'Crime type not found.'})

    # update data into database in the table "Events"
    with connection.cursor() as cursor:
        # close foreign key check
        cursor.execute("SET FOREIGN_KEY_CHECKS=0")

        cursor.execute(
            "UPDATE Events SET DateReported='%s', DateOccur='%s', AreaName='%s', StreetName='%s', CrimeType=%s WHERE EventID=%s" % (date_reported, date_occurred, area_name, street_name, crime_type, event_id))

        # open foreign key check
        cursor.execute("SET FOREIGN_KEY_CHECKS=1")

    return HttpResponse({'Event updated with EventID: %s' % event_id})


@require_GET
def crimes_delete(request):
    event_id = request.GET.get('id')

    if check_int(event_id):
        return HttpResponse({'Invalid event id.'})

    # check data is in the database or not
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM Events WHERE EventID LIKE %s", [event_id])
        rows = cursor.fetchall()
        if len(rows) == 0:
            return HttpResponse({'Event id not found.'})

    # delete data from database in the table "Events"
    with connection.cursor() as cursor:
        print("execute")
        # close foreign key check
        cursor.execute("SET FOREIGN_KEY_CHECKS=0")
        cursor.execute(
            "DELETE FROM Events WHERE EventID LIKE %s", [event_id])
        # open foreign key check
        cursor.execute("SET FOREIGN_KEY_CHECKS=1")

    return HttpResponse({'Event deleted with EventID: %s' % event_id})


# Stage 5
@require_GET
def combined_crime_data(request, district, age_min=18, age_max=30):
    response = {}

    with connection.cursor() as cursor:
        cursor.callproc('CombinedCrimeData', [district, age_min, age_max])

        victims_by_district = cursor.fetchall()
        # print(victims_by_district)

        cursor.nextset()
        unique_victims_by_crime_type = cursor.fetchall()
        # print(unique_victims_by_crime_type)

    results1 = []
    for row in victims_by_district:
        result = {
            'AreaName': row[0],
            'Number_of_Victims': row[1],
        }
        results1.append(result)

    results2 = []
    for row in unique_victims_by_crime_type:
        result = {
            'AreaName': row[0],
            'Crime_Type': row[1],
            'Number_of_Unique_Victims': row[2],
        }
        results2.append(result)

    response = {
        'victims_by_district': results1,
        'unique_victims_by_crime_type': results2,
    }

    return JsonResponse(response)

    # print("done")
    # victims_by_district_data = results[0]
    # crime_type_data = results[1]

    # response = {
    #     'victims_by_district': victims_by_district_data,
    #     'crime_type_data': crime_type_data,
    # }

    # return HttpResponse(response)
    # results = []
    # results.append(response)

    # # return JsonResponse(results)


@require_GET
def crimes_statistics(request):
    # assuming the name attribute of the checkbox is 'checkbox'
    checked_boxes = request.GET.get('boxes')
    # Your code to process the query and the list of checked boxes here
    boxes_list = checked_boxes.split(",")

    dic = {"row1_box1": '110',
           "row1_box2": '231',
           "row1_box3": '237',
           "row1_box4": '251',
           "row1_box5": '421',
           "row1_box6": '812',
           "row1_box7": '815',
           "row1_box8": '845',
           "row1_box9": '886',
           "row1_box10": '940',
           "row2_box1": '77th Street',
           "row2_box2": 'Central',
           "row2_box3": 'Devonshire',
           "row2_box4": 'Foothill',
           "row2_box5": 'Harbor',
           "row2_box6": 'Hollenbeck',
           "row2_box7": 'Hollywood',
           "row2_box8": 'Mission',
           "row2_box9": 'N Hollywood',
           "row2_box10": 'Newton',
           "row2_box11": 'Northeast',
           "row2_box12": 'Olympic',
           "row2_box13": 'Pacific',
           "row2_box14": 'Rampart',
           "row2_box15": 'Southeast',
           "row2_box16": 'Southwest',
           "row2_box17": 'Topanga',
           "row2_box18": 'Van Nuys',
           "row2_box19": 'West LA',
           "row2_box20": 'West Valley',
           "row2_box21": 'Wilshire',
           }

    types = []
    districts = []
    for i in boxes_list:
        if i in dic:
            if i.startswith("row1"):
                types.append(dic[i])
            else:
                districts.append(dic[i])

    # print(types)
    # print(districts)
    if len(types) == 0:
        return HttpResponse({'No crime type selected.'})
    if len(districts) == 0:
        return HttpResponse({'No district selected.'})

    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM Events WHERE CrimeType IN %s", [types])
        rows1 = cursor.fetchall()

    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM Events WHERE AreaName IN %s", [districts])
        rows2 = cursor.fetchall()

    results1 = []
    results2 = []
    for row in rows1:
        result = {
            'eventid': row[0],
            'datereported': row[1],
            'dateoccurred': row[2],
            'area_name': row[3],
            'location': row[4],
            'crime_type': row[5]
        }
        results1.append(result)

    for row in rows2:
        result = {
            'eventid': row[0],
            'datereported': row[1],
            'dateoccurred': row[2],
            'area_name': row[3],
            'location': row[4],
            'crime_type': row[5]
        }
        results2.append(result)

    # result should be the common part of results1 and results2
    results = []
    for i in results1:
        if i in results2:
            results.append(i)

    if (len(results) == 0):
        return HttpResponse({'results': 'No results found.'})

    return JsonResponse({'results': results})


@require_GET
def crimes_type_description(request, CrimeType):
    print(CrimeType)
    result = []
    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT CrimeDesc FROM Crimes WHERE CrimeType = %s", [CrimeType])
        row = cursor.fetchall()
        result = row

    if (len(result) == 0):
        return HttpResponse({'results': 'No results found.'})

    return JsonResponse({'description': result})


@require_GET
def crimes(request):
    date = request.GET.get('date')
    print(date)

    with connection.cursor() as cursor:
        if date:
            cursor.execute("""
                SELECT Events.EventID, Locations.Latitude, Locations.Longitude 
                FROM Events
                JOIN Locations ON Events.StreetName = Locations.StreetName AND Events.AreaName = Locations.AreaName
                WHERE DATE(Events.DateOccur) = %s
                ORDER BY RAND()
            """, [date])
        else:
            cursor.execute("""
                SELECT Events.EventID, Locations.Latitude, Locations.Longitude 
                FROM Events
                JOIN Locations ON Events.StreetName = Locations.StreetName AND Events.AreaName = Locations.AreaName
                ORDER BY RAND()
                LIMIT 1000
            """)

        rows = cursor.fetchall()
        print(rows)

    results = []
    for row in rows:
        result = {
            'eventid': row[0],
            'latitude': row[1],
            'longtitude': row[2],
        }
        results.append(result)

    return JsonResponse({'results': results})
