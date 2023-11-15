from typing import Any
from django.core.management import BaseCommand
from django.contrib.auth.models import User
from app.models import Profiles, Moments, Comments, Subscriptions, LikesComment, LikesMoment, Tags
from faker import Faker
import random
from django.utils.crypto import get_random_string

Fake = Faker()

class Command(BaseCommand):
    help = 'Fill database'
    avatars = ['image/avatars/avatar1.jpg', 'image/avatars/avatar2.jpg', 'image/avatars/avatar3.jpg', 'image/avatars/cat.jpg', 'image/avatars/dog.jpg', 'image/avatars/default.jpg']
    moments = ['image/moments/moment1.jpg', 'image/moments/moment2.jpg','image/moments/moment3.jpg','image/moments/moment4.jpg','image/moments/moment5.jpg',
               'image/moments/moment6.jpg','image/moments/moment7.jpg','image/moments/moment8.jpg','image/moments/moment9.jpg','image/moments/moment10.jpg',
               'image/moments/moment11.jpg','image/moments/moment12.jpg','image/moments/moment13.jpg','image/moments/moment14.jpg','image/moments/moment15.jpg',
               'image/moments/moment16.jpg','image/moments/moment17.jpg','image/moments/moment18.jpg','image/moments/moment19.jpg','image/moments/moment20.jpg']

    def handle(self, *args, **options):
        
        ratio = options['ratio']

        users = []
        profiles =[]
        for _ in range(ratio):
            # username=get_random_string(random.randint(6, 10))
            # email=''
            # password='1234567890'
            username = Fake.user_name()
            email = Fake.email()
            password = '12345678'
            user = User(username=username, email=email, password=password)
            profile = Profiles(user = user, avatar = random.choice(self.avatars), nickname=Fake.user_name())
            users.append(user)
            profiles.append(profile)
        User.objects.bulk_create(users)
        print('созданы юзеры')
        Profiles.objects.bulk_create(profiles)
        print('созданы профили')

        tags =[]
        for i in range(ratio):
            word = get_random_string(random.randint(4, 10))
            tag = Tags(title=word)
            tags.append(tag)
        Tags.objects.bulk_create(tags)
        print('созданы тэги')

        moments=[]
        comments=[]
        likemoments =[]
        likecomments=[]
        for i in range(ratio*10):
            date=Fake.date_between()
            moment = Moments(author=profiles[random.randint(1, ratio-1)], content = Fake.text(max_nb_chars=random.randint(30, 250)),
                             image = random.choice(self.moments), date_creation = date)
            moments.append(moment)
            for _ in range(random.randint(15, 30)):
                likemoment = LikesMoment(author=profiles[random.randint(1, ratio-1)], moment=moment, date_creation = Fake.date_between_dates(date_start=date))
                likemoments.append(likemoment)
            for _ in range(random.randint(6, 15)):
                comment = Comments(content=Fake.sentence(), author=profiles[random.randint(1, ratio-1)], moment=moment, date_creation = Fake.date_between_dates(date_start=date))
                comments.append(comment)
                for _ in range(random.randint(0, 5)):
                    likecomment = LikesComment(author=profiles[random.randint(1, ratio-1)], comment=comment, date_creation = Fake.date_between_dates(date_start=date))
                    likecomments.append(likecomment)
        
        Moments.objects.bulk_create(moments)
        Comments.objects.bulk_create(comments)
        LikesComment.objects.bulk_create(likecomments)
        LikesMoment.objects.bulk_create(likemoments)

        subscribers =[]
        for _ in range(ratio * 200):
            author = Profiles.objects.get(user_id=random.randint(1, ratio-1))
            subscriber = Profiles.objects.get(user_id=random.randint(1, ratio-1))
            if author != subscriber:
                sub = Subscriptions(author=author, subscriber=subscriber)
                subscribers.append(sub)
        Subscriptions.objects.bulk_create(subscribers)

        moments_obj = Moments.objects.filter(tags__isnull=True)
        tags_obj = Tags.objects.all()
        tags_ids = list(tags_obj.values_list('id'))
        for moment in moments_obj:
            for _ in range(random.randint(0, 8)):
                moment.tags.add(Tags.objects.get(id=random.randint(1, ratio-1)))

    def add_arguments(self, parser):
        parser.add_argument(
            'ratio',
            type=int,
            default=0,
            help='Коэфициент заполнения сущностей'
        )