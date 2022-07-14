import json
from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
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



@csrf_exempt
def generate_data(request, file=None):
    
    
    if request.method == 'POST':
    
        data = dict()
        filepath = r'media\\'
        filename = request.session.get('filename')
        
        xls = pd.ExcelFile(os.path.join(settings.BASE_DIR, filepath, filename))
        
        # Get data from Page 1 of Cohort Report Data      
                
        pg1 = pd.read_excel(xls, 'pg1')
        key = str()
        for cell1, cell2 in pg1.values.tolist():
            if not pd.isna(cell2):
                if cell1 == '>>>':
                    key = cell2
                    data[key] = {}
                if type(cell2) in [int, float]:
                    data[key][cell1] = round(cell2, 2)
                
        
        # Get data from Page 2, 3 and 5
        pg2 = pd.read_excel(xls, 'pg2')  
        pg3 = pd.read_excel(xls, 'pg3')
        pg5 = pd.read_excel(xls, 'pg5')
        metric_list = list()
        
        for pg in [
                pg2.values.tolist(), 
                pg3.values.tolist(), 
                pg5.values.tolist()
                ]:

            for index, cell in enumerate(pg):
                    
                if not pd.isna(cell[1]):
                    if cell[0] == '>>>':
                        metric_list = []
                        metric_list.append([i for i in pg[index+1]])
                        key = cell[1]
                        data[key] = {}
                        data[key]['categories'] = []
                        data[key][metric_list[0][1]] = []
                        
                        if len(cell) > 2:
                            if not pd.isna(metric_list[0][2]):
                                data[key][metric_list[0][2]] = []
                        
                    if type(cell[1]) in [int, float]:
                        data[key]['categories'].append(cell[0])
                        data[key][metric_list[0][1]].append(round(cell[1], 2))
                        if len(cell) > 2:
                            if not pd.isna(metric_list[0][2]):
                                data[key][metric_list[0][2]].append(round(cell[2], 2))
                        
        # Convert dict<key:list> to dict<key:value> for the following tables
        # might be dynamic 
        table_list = ['Expertise', 'Role', 'Gender', 'Work Experience']

        for key in table_list:
            for index, value in enumerate(data[key]['categories']):
                data[key].setdefault(value, data[key]['Learners'][index])
                
        
        
        pg4 = pd.read_excel(xls, 'pg4') 
        
        for index, cell in enumerate(pg4.values.tolist()[0::2]):
            if not pd.isna(cell[1]):
                if cell[0] == '>>>':
                    metric_list = []
                    metric_list.append([i for i in pg4.values.tolist()[index*2+1]])
        
                    key = cell[1]
                    data[key] = {}
                    data[key]['categories'] = []
                    
                    
                    for i in pg4.values.tolist()[1::2]:
                        data[key][i[0]] = {}
                        for form in ['PRE', 'POST']:
                            data[key][i[0]][form] = {}
                            
                            data[key][i[0]][form][metric_list[0][2]] = []
                            data[key][i[0]][form][metric_list[0][3]] = []
                            data[key][i[0]][form][metric_list[0][4]] = []
                    
                if type(cell[2]) in [int, float] and cell[0] != '>>>' :
                    data[key]['categories'].append(cell[0])
                    
                    data[key][cell[0]][cell[1]][metric_list[0][2]] = round(cell[2], 2)
                    data[key][cell[0]][cell[1]][metric_list[0][3]] = round(cell[3], 2)
                    data[key][cell[0]][cell[1]][metric_list[0][4]] = round(cell[4], 2)
                    
                    data[key][cell[0]][pg4.values.tolist()[index*2+1][1]][metric_list[0][2]] = round(pg4.values.tolist()[index*2+1][2], 2)
                    data[key][cell[0]][pg4.values.tolist()[index*2+1][1]][metric_list[0][3]] = round(pg4.values.tolist()[index*2+1][3], 2)
                    data[key][cell[0]][pg4.values.tolist()[index*2+1][1]][metric_list[0][4]] = round(pg4.values.tolist()[index*2+1][4], 2)

                    for val in range(2, len(metric_list[0])):
                        data[key]['Module/Stage'][cell[1]][metric_list[0][val]].append(round(cell[val], 2))
                        data[key]['Module/Stage'][pg4.values.tolist()[index*2+1][1]][metric_list[0][val]].append(round(cell[val], 2))
        
        
        data_obj = json.dumps(data, indent = 4) 
        print(data_obj)
        del request.session['filename']
        return JsonResponse(data_obj, safe=False)



def cohort_rpt(request):
    return render(request, 'highchart.html')

