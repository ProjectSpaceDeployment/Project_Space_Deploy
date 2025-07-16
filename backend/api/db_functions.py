from django.db.models import Func, CharField

class RegexpMatch(Func):
    function = 'REGEXP_MATCHES'
    template = "%(function)s(%(expressions)s, %(pattern)s)"
    output_field = CharField()

    def __init__(self, expression, pattern, **extra):
        super().__init__(expression, pattern=pattern, **extra)