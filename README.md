# hackernewsUrban

Steps for project to work:

1. Check Python 3 version

    a.  $ python3 --version

2. Install pip

    $ python3 -m pip --version
    
    $ pip 9.0.1 from c:\python36\lib\site-packages (python 3.6.1)

    $ python3 -m pip install --user --upgrade pip

3. Create Virtual Environment

    $ python3 -m pip install --user virtualenv

4. Clone Repository:

    $ git clone https://github.com/parthchat99/hackkernewsUrb.git 

5. Install dependencies:

    $ pip install requirements.txt

6. Start Django server:

    $ cd hackernewsAPI

    $ python manage.py makemigrations

    $ python manage.py migrate

    $python manage.py runserver

7. Start Angular server:

    $ cd hackernersFrontend

    $ npm install

    $ ng serve