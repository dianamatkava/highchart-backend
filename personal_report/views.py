from collections import defaultdict
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
import json
import os
import pandas as pd
from django.views.decorators.csrf import csrf_exempt

from django.core.files.storage import FileSystemStorage


def import_rpt(request):
    if request.method == 'POST' and request.FILES['filename']:
        file = request.FILES['filename']
        fs = FileSystemStorage()
        try:
            filename = fs.save(file.name, file)
            request.session['filename'] = filename
        except Exception as _ex:
            print(_ex)
        return cohort_rpt(request)
            
    return render(request, 'import_rpt.html')


def round_score(num:int(), truncate:int(), persentage:bool()):
            if persentage:
                return round(round(num++1e-06, truncate)*100)
            return round(num++1e-06, truncate)
        
        
def truncate_items(data:dict(), table_list:list()):
    # import pdb;pdb.set_trace()
    for table in table_list:
        if len(data[table]['LEARNERS']) > 10:
            x = data[table]['LEARNERS'][len(data[table]['LEARNERS'])-1]
            other = 0
            
            for i in range(len(data[table]['LEARNERS']), 0, -1): 
                if x!= data[table]['LEARNERS'][i-1]:
                    if i-1 < 9:
                        data[table]['LEARNERS'] = data[table]['LEARNERS'][0:i]
                        data[table]['LEARNERS'].append(other)
                        
                        data[table][table] = data[table][table][0:len(data[table]['LEARNERS'])-1]
                        data[table][table].append('Other')
                        
                        # Truncate dict
                        del_key = list()
                        for key in data[table].keys():
                            if not key in data[table][table] and not key in [table, 'LEARNERS']:
                                del_key.append(key)
                        list(map(data[table].__delitem__, filter(data[table].__contains__,del_key)))
                        break
                    
                    x = data[table]['LEARNERS'][i-1]
                other += int(data[table]['LEARNERS'][i-1])
    return data


@csrf_exempt
def generate_data(request, file=None):

    x = int()
    if request.method == 'POST':
    
        data = defaultdict(lambda: defaultdict(dict))
        filepath = r'media'
        filename = request.session.get('filename')

        xls = pd.ExcelFile(os.path.join(settings.BASE_DIR, filepath, filename))
        pages = {f'pg{num}': pd.read_excel(xls, f'pg{num}') for num in range(1, 6)}
        
        table_title, keys_list = str(), list()
        values_list, persentage =[[]]*10, int()
        for page_name, page, in pages.items():
            for row in page.iterrows():
                if not pd.isna(row[1][0]):   
                    # Define table title and set up new dict                 
                    if type(row[1][0])==str and row[1][0][0:3].startswith(('>>>', '<<<')):
                        table_title = '_'.join(row[1][0].split()[1::]).upper()
                        persentage = 1 if str(row[1][1]) == '%' else 0
                        data[table_title] = dict()
                        
                    # Defines if wether we are looping throught headers
                    elif len(row[1]) < 4 and type(row[1][1]) == str: 
                        keys_list = '_'.join(str(row[1][0]).split()).upper()
                        if len(row[1]) < 4:
                            values_list[0] = '_'.join(row[1][1].split()).upper()
                            if len(row[1]) == 3 and type(row[1][2]) == str:
                                values_list[1] = '_'.join(row[1][2].split()).upper()
                                
                    # Defines if wether we are looping throught headers on page 3/4    
                    elif len(row[1]) > 3 and type(row[1][3]) == str:
                        keys_list = '_'.join(str(row[1][0]).split()).upper()
                        for i, header in enumerate(row[1]):
                            values_list[i] = '_'.join(header.split()).upper()
                            
                    elif len(row[1]) > 3 and type(row[1][1]) == str and page_name=='pg3':
                        print('\n', row[1][0], row[1][1], row[0])
                        values_list[0] = '_'.join(row[1][0].split()).upper()
                        values_list[1] = '_'.join(row[1][1].split()).upper()
                        
                    # Looping through main table content (values). 
                    elif len(row[1]) < 4 or page_name == 'pg3' and type(row[1][1]) in [int, float]:
                        data[table_title][row[1][0]] = round_score(row[1][1], 2, persentage)
                        data[table_title].setdefault(keys_list, []).append(row[1][0])
                        data[table_title].setdefault(values_list[0], []).append(round_score(row[1][1], 2, persentage))
                        if len(row[1]) > 2 and not pd.isna(row[1][2]):
                            for i in range(len(row[1])-1):
                                data[table_title].setdefault(values_list[i+1], []).append(round_score(row[1][i+1], 2, persentage))
                            
                    # Looping through main table content (values) on page 4
                    elif page_name == 'pg4':
                        data[table_title].setdefault(keys_list, []).append(row[1][0])
                        data[table_title].setdefault(row[1][1], {})
                        
                        data[table_title][row[1][1]].setdefault(values_list[0], []).append(round_score(row[1][2], 2, persentage))
                        data[table_title][row[1][1]].setdefault(values_list[1], []).append(round_score(row[1][3], 2, persentage))
                        data[table_title][row[1][1]].setdefault(values_list[2], []).append(round_score(row[1][4], 2, persentage))
                        
            # Remove duplicates from Module/Stage (page4)
            data['GAP_TO_GOAL']['MODULE/STAGE'] = list(dict.fromkeys(data['GAP_TO_GOAL']['MODULE/STAGE']))
            
        # Merge xtra items (more the 10) to "Other"
        data = truncate_items(data, ['BUSINESS_UNIT', 'LOCATION', 'EXPERTISE'])
        
        data_obj = json.dumps(data, indent = 4) 
        del request.session['filename']
        
        print(data_obj)
        return JsonResponse(data_obj, safe=False)



def cohort_rpt(request):
    return render(request, 'highchart.html')

