class User(object):
    def __init__(self, name, password):
        self.name = name
        self.password = password

    def __str__(self):
        return 'User(name=%s)' % self.name
