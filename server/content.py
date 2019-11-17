import serialize


class Content(serialize.JsonSerializer):
    def __init__(self, name, text, date):
        self.name = name
        self.text = text
        self.date = date
