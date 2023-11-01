from faker import Faker
import random

from django.core.management import BaseCommand

fake = Faker()

class Command(BaseCommand):

    def handle(self, *args, **options):

        ratio = options['ratio']
        print(ratio)

        for i in range(100):
           print(fake.email())

    def add_arguments(self, parser):
        parser.add_argument(
            'ratio',
            type=int,
            default=0,
            help='Коэфициент заполнения сущностей'
        )