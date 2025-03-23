FROM python:3.14-rc

ENV PROJECT=sidequest

RUN mkdir /${PROJECT}
WORKDIR /${PROJECT}/

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY ./run.py /${PROJECT}/
ADD ./app /${PROJECT}/app

CMD ["python3", "run.py"]
#CMD ["python3", "-m", "flask", "run"]

