from multiprocessing import context
import os
import re
import time
from functools import wraps
from django.conf import settings
from django.shortcuts import render
from django.http import HttpResponse
from docxtpl import DocxTemplate

from .etc.config.gbs_config import product



def generate_path(path='', filename='',):
    if filename:
        return os.path.join(settings.BASE_DIR, *path.split('/'), filename)
    
    
def execution_speed(func):
    @wraps(func)
    def wrapper(request, *args, **kwargs):
        start = time.time()
        func(request)
        end = time.time()
        print(f'execution_speed is {end-start}')
        return render(request, 'demo.html', context={'time': end-start})
    return wrapper


@execution_speed
def python_docs(request): 
    # # Create charts
    
    LEARNER = "dianaGera"
    learner_get_data = {
        'chart1': 10,
        'chart2': 30,
        'chart3': 20,
        'chart4': 1
    }
    
    # Replace values in Render Settings and Callback files and create new settings files for each learner
    regex = re.compile(r'\[([A-Z_]+)\]')
    file_names = dict()
    temp_location = 'etc/temp/learner_chart_settings/'
    
    for chart in product['charts']:
        for chart_settings in product['charts'][chart]:
            
            template_path = product['charts'][chart][chart_settings]['template_path']
            template_name = product['charts'][chart][chart_settings]['template_name']
            
            # Defind default path to Render Settings and Callback files 
            file_names[chart_settings] = f"{generate_path(template_path, '_'.join(filter(None, [template_name])))}"
            upload_to = f"{generate_path(temp_location, '_'.join(filter(None, [LEARNER, template_name])))}"
            
            # if file has values that need to be replaced
            if product['charts'][chart][chart_settings]['data']:
                
                # call function to get data. returns dict()
                learner_data = product['charts'][chart][chart_settings]['data'](learner_get_data[chart])
                
                with open(f"{file_names[chart_settings]}") as f:
                    contents = f.read()
                
                # Find all matching regex arguments and replace it by learner_data key value pairs
                for key in re.findall(regex, contents):
                    value_name = re.compile(r'\[{}]'.format(key))
                    contents = value_name.sub(str(learner_data.get(key)), contents)
                
                with open(f"{upload_to}", 'w') as f:
                    f.write(contents) 
                    
                file_names[chart_settings] = upload_to
        print(file_names)
                
        cmd = f'cmd /c c: && .\highcharts-export-server --infile {file_names["settings_files"]} --outfile .\\etc/temp\\chart_images\\{LEARNER}-{chart}.png'
        callback = f'--callback {file_names["callback_files"]}'
        run_cmd = os.system(' '.join([cmd, callback if file_names["callback_files"] != 'None' else '']))       
             
    if run_cmd:
        doc = DocxTemplate('media\\docx\\Personal Rep`ort Template - NEW FORMAT - 10M.docx')
        
        context = { 
                'TRAINEE': "Diana",
                'CLIENT_COHORT': 'ZZL Cohort 1',
                'Product': 'Global Business Skills',
                'DATE': 'today',
                'SCORE': "100%",
                'CERT': "Excellent",
                'DESCRIPTION1': "Some custom description 1",
                'DESCRIPTION2': "Some custom description 2"
                }
        doc.render(context)
        for image in product['image_to_replace']:
            doc.replace_pic(product['image_to_replace'][image], f'.\etc\\temp\chart_images\{LEARNER}-{image}.png')
        doc.save('media\\docx\\example.docx')

    # return HttpResponse()




    # # Find images name
    # for s in document.inline_shapes:
    #    print (s.height.cm,s.width.cm,s._inline.graphic.graphicData.pic.nvPicPr.cNvPr.name)

    # 1.7768944444444446 5.96
    # 1.016661111111111 3.05 Picture 15
    # 10.16 16.4846 Picture 3
    # 20.32 16.483541666666667 Picture 2
    # 11.43 16.4846 Picture 1
    # 1.016 3.048 Cert - None.png
    # 1.016 3.048 Cert - Completion.png
    # 1.016 3.048 Cert - Merit.png
    # 1.016 3.048 Cert - Distinction.png

    # # print(chart, type(chart))       # 4058 file not found         # type <int>
    #                                   # 0 OK
    #                                   # 1 System cant find the path
    #                                   # if file is invalid the server will never stop, no error
    
        
        
        
    # FIRST PAGE HEADER
    # trainee_name = document.sections[0].first_page_header.tables[0].rows[1].cells[0].paragraphs[0].runs[0]      # TRAINEE
    # product_name = document.sections[0].first_page_header.tables[0].rows[1].cells[1].paragraphs[0].runs[0]      # Global Business Skills
    # client_cohort = document.sections[0].first_page_header.tables[0].rows[2].cells[0].paragraphs[0].runs[0]     # CLIENT COHORT
    # date = document.sections[0].first_page_header.tables[0].rows[2].cells[1].paragraphs[0].runs[1]              # DATE
        
    # trainee_name.text = trainee_name.text.replace("[TRAINEE]", "Diana Matkava") 
    # product_name.text = product_name.text.replace("[Global Business Skills]", "GBS1")
    # client_cohort.text = client_cohort.text.replace("[CLIENT COHORT]", "ZZL_Cohort 4") 
    # date.text = date.text.replace("[DATE]", "16.06.2022")
    
    
    # # # PAGE 1 TABLE
    # score_value = document.tables[0].columns[0].cells[1].paragraphs[0].runs[0]   
    # certificat = document.tables[0].columns[1].cells[1].paragraphs[0].runs[0]
    # description1 = document.tables[0].columns[1].cells[3].paragraphs[0].runs[0]
    # description2 = document.tables[0].columns[1].cells[3].paragraphs[0].runs[2]
    # score_value.text = score_value.text.replace("[SCORE]", "100%")
    # certificat.text = certificat.text.replace("[CERT]", "EXELLENT")
    # description1.text = description1.text.replace('[DESCRIPTION1]', 'My custom description 1')
    # description2.text = description2.text.replace('[DESCRIPTION2]', 'My custom description 2')
    
    # # find and replace images in table
    # document.tables[0].columns[0].cells[2]._element.clear_content()
    # document.tables[0].columns[0].cells[2].add_paragraph().add_run().add_picture('media\img\chart4.png', width=Inches(2.5), height=Inches(0.8))
    
    # document.tables[0].columns[1].cells[2]._element.clear_content()
    # document.tables[0].columns[1].cells[2].add_paragraph().add_run().add_picture('media\img\certificate_criteria_distinction.png', width=Inches(1.4), height=Inches(0.5))
    # document.tables[0].columns[1].cells[2].paragraphs[0].alignment = WD_ALIGN_PARAGRAPH.CENTER
 
    
 
 
    # # # PARAGRAPHS
    
    # # # Multiple replace in loop
    # context = {
    #     '$cert': 'Excellent',
    #     '$score_heights': 'higher', 
    #     '$score': '100%',
    #     '$user_top_module_1': 'Self Awareness',
    #     '$user_top_module_2': 'Planning and Agility',
    #     '$user_low_module_1': 'Something',
    #     '$user_low_module_2': 'Something',
    # }
    # # document.paragraphs[1].text = reduce(lambda a, kv: a.replace(*kv), context.items(), document.paragraphs[1].text)
   
    # for i in document.paragraphs:
    #     i.text = reduce(lambda a, kv: a.replace(*kv), context.items(), i.text)
        
    
    
    # works nice if we know indexes
    # context = {
    #     'cert': 'Excellent',
    #     'score_heights': 'higher', 
    #     'score': 100,
    #     'user_top_module_1': 'Self Awareness',
    #     'user_top_module_2': 'Planning and Agility',
    #     'user_low_module_1': 'Something',
    #     'user_low_module_2': 'Something',
    # }
    
    # text = render_to_string('content.txt', context)
    # document.paragraphs[1].text = text

def report(request):
    
# without charts
#     url = 'http://export.highcharts.com/'
#     headers = {
#     "Accept": "application/json",
#     # "Content-Type": "multipart/form-data",
#   }
    
#     chart_api = {
#         "options": {
#             "chart": {
#                     "type": "bar"
#                 },
#                 "title": {
#                     "text": "Fruit Consumption"
#                 },
#                 "xAxis": {
#                     "categories": ["Apples", "Bananas", "Oranges"]
#                 },
#                 "yAxis": {
#                     "title": {
#                         "text": "Fruit eaten"
#                     }
#                 },
#                 "series": [{
#                     "name": "Jane",
#                     "data": [1, 0, 4]
#                 }, {
#                     "name": "John",
#                     "data": [5, 7, 3]
#                 }]
#             },
        
#         "filename": "test.png",
#         "type": "image/png"
#     #   'async': True
#     }
    
#     r = requests.post(url, data=chart_api, headers=headers)

#     file = open("sample_image.png", "wb")
#     file.write(r.content)
#     file.close()
    
    
    
    # YES Works but has ADs
    doc = aw.Document('csv\\new-Highcharts.html')
    doc.save("html-to-word-output.docx")
    
    # doc = aw.Document()
    # builder = aw.DocumentBuilder(doc)
    # r = requests.get('http://127.0.0.1:4200/new-java-app', allow_redirects=True)
    # print(r.text)
    
    # # urllib.request.urlretrieve("http://127.0.0.1:4200/new-java-app", "test.html")

                
    # builder.insert_html(r.text)
    # doc.save("html-to-word-req.docx")
    
    
    # import urllib.request, urllib.error, urllib.parse

    # url = 'http://127.0.0.1:4200/new-java-app'

    # response = urllib.request.urlopen(url)
    # webContent = response.read().decode('UTF-8')
    # print(webContent[0:300])
    
    
    
    
    
    # from selenium import webdriver
    # from webdriver_manager.chrome import ChromeDriverManager

    # #set chromedriver.exe path
    
    # option = webdriver. ChromeOptions()
    # option. add_argument('headless')
    # driver = webdriver.Chrome(ChromeDriverManager().install(), options=option)
    
    # driver.get("http://127.0.0.1:4200/new-java-app")
    # driver.implicitly_wait(3.5)
    
    # builder.insert_html(driver.page_source)
    # doc.save("html-to-word-sel.docx")
    
    # driver.quit()
    
    
    
    
    # from pywebcopy import save_webpage
    # url = 'http://127.0.0.1:4200/pdf'
    # download_folder = '.\\' 

    # kwargs = {'bypass_robots': True, 'project_name': 'recognisable-name'}

    # save_webpage(url, download_folder, **kwargs)
    
    
    #YES creates file without charts
    # word = win32com.client.Dispatch("Word.Application")
    # in_file  = os.path.abspath(r'csv\\Highcharts.html')
    
    # in_file = requests.get('http://127.0.0.1:4200/new-java-app')
    # in_name  = in_file.text
    # out_file = os.path.abspath("%s123.doc" % in_name)
    
    # doc = word.Documents.Add(in_file)
    # word.Selection.WholeStory()
    # word.Selection.Copy()
    # doc.Close()
    
    # doc = word.Documents.Add()
    # word.Selection.Paste()
    # doc.SaveAs(out_file, FileFormat=0)
    # doc.Close()

    # word.Quit()
    
    
    
    #NO decode error
    # new_parser =
    # HtmlToDocx()
    # new_parser.parse_html_file('csv\Highcharts.html', 'Highcharts-out')
    
    
    
    #NO VEERY BED creates file without charts
    # import pypandoc
    # pypandoc.download_pandoc()
    # output = pypandoc.convert_file('csv\Highcharts.html', 'docx', outputfile="somefile.docx", extra_args=['-RTS'])
    # assert output == ""
    
    
    return HttpResponse()