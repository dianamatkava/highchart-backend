from .get_data import get_data_chart, get_data_chart3, get_data_chart4

product = {
    'charts': {
        'chart1': {
            'settings_files': {
                'template_path': 'etc/highchart_render_settings',
                'template_name': 'chart1SettingsGeneral.json',
                'data': get_data_chart
            },
            'callback_files': {
                'template_path': None,
                'template_name': None,
                'data': None
            },
        },
        
        'chart2': {
            'settings_files': {
                'template_path': 'etc/highchart_render_settings',
                'template_name': 'chart2SettingsGeneral.json',
                'data': get_data_chart
            },
            'callback_files': {
                'template_path': 'etc/highchart_callback_settings',
                'template_name': 'grouped-categories.js',
                'data': None
            },
        },
        
        'chart3': {
            'settings_files': {
                'template_path': 'etc/highchart_render_settings',
                'template_name': 'chart3SettingsGeneral.json',
                'data': get_data_chart3
            },
            'callback_files': {
                'template_path': 'etc/highchart_callback_settings',
                'template_name': 'grouped-categories.js',
                'data': None
            },
        },
        
        'chart4': {
            'settings_files': {
                'template_path': 'etc/highchart_render_settings',
                'template_name': 'chart4SettingsGeneral.json',
                'data': get_data_chart4 
            },
            'callback_files': {
                'template_path': 'etc/highchart_callback_settings',
                'template_name': 'chart4RenderSettings.js',
                'data': get_data_chart4
            },
            
        },
    },
    'image_to_replace': {
        'cert': 'Picture 15',
        'chart1': 'Picture 3',
        'chart2': 'Picture 2',
        'chart3': 'Picture 1',
        'chart4': 'Picture 6'
    }
    
    # 'settings_path': {
    #     'render_settings': 'etc\highchart_render_settings',
    #     'callback_path': 'etc\highchart_callback_settings'
    # }
}