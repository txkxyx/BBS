def object_to_listjson(object_list):
    result = list()
    for obj in object_list:
        data = dict()
        for key, value in obj.__dict__.items():
            if key in obj.columns:
                data[key] = str(value)
        result.append(data)
    return result
