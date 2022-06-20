# from personal_report.models import UserData
import random


def get_data_chart(value):
    # return UserData.objects.get(id=id)
    
    data = {
        'DATA_TRAINEE': [random.randint(60, 100) for i in range(value)],
        'DATA_COHORT': [random.randint(70, 100) for j in range(value)]
    }
    return data


def get_data_chart3(value):
    # return UserData.objects.get(id=id)
    import itertools
    # data = {
    #     'GAP_TO_GOAL_DATA': [random.randint(0, 1) for i in range(20)],
    #     'INCREASE_IN_SELF_RATING_DATA':  [x for y in zip([0 for i in range(10)], [random.randint(60, 100) for i in range(10)]) for x in y],
    #     'DROP_IN_SELF_RATING_DATA': [random.randint(0, 0) for i in range(20)],
    #     'CURRENT_RATING_DATA': [x for y in zip([random.randint(60, 100) for i in range(10)], [0 for i in range(10)]) for x in y]
    # }   
    
    data = {
        'GAP_TO_GOAL_DATA': [1, 0, 2, 1, 1, 0, 1, 0, 1, 0, 2, 1, 1, 0, 1, 0, 1, 0, 0, 0],
        'INCREASE_IN_SELF_RATING_DATA':  [0, 5, 0, 4, 0, 5, 0, 5, 0, 5, 0, 4, 0, 5, 0, 5, 0, 5, 0, 0],
        'DROP_IN_SELF_RATING_DATA': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        'CURRENT_RATING_DATA': [4, 0, 3, 0, 4, 0, 4, 0, 3, 0, 3, 0, 4, 0, 4, 0, 4, 0, 5, 5]
    }  
    return data


def get_data_chart4(value):
    
    data = {
        'COHORT_AVERAGE_DATA': 76,
        'YOUR_SCORE_DATA': 88,
    }
    return data