FROM python:3.11-slim

WORKDIR /app

# System deps
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# App code
COPY . .

EXPOSE 8000

CMD ["python", "app.py"]
