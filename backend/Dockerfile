# Use an official Python runtime as a parent image
FROM python:3.10-bullseye

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update -y && apt-get install -y wget xvfb unzip jq

# Install Google Chrome dependencies
RUN apt-get install -y libxss1 libappindicator1 libgconf-2-4 \
    fonts-liberation libasound2 libnspr4 libnss3 libx11-xcb1 libxtst6 lsb-release xdg-utils \
    libgbm1 libnss3 libatk-bridge2.0-0 libgtk-3-0 libx11-xcb1 libxcb-dri3-0 && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create X11 directory with proper permissions (before user creation)
RUN mkdir -p /tmp/.X11-unix && chmod 1777 /tmp/.X11-unix

# Create a non-root user
RUN useradd -m myuser

# Set up Chrome and ChromeDriver
RUN curl -s https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions-with-downloads.json > /tmp/versions.json && \
    CHROME_URL=$(jq -r '.channels.Stable.downloads.chrome[] | select(.platform=="linux64") | .url' /tmp/versions.json) && \
    wget -q --continue -O /tmp/chrome-linux64.zip "$CHROME_URL" && \
    unzip /tmp/chrome-linux64.zip -d /opt/chrome && \
    chmod +x /opt/chrome/chrome-linux64/chrome && \
    CHROMEDRIVER_URL=$(jq -r '.channels.Stable.downloads.chromedriver[] | select(.platform=="linux64") | .url' /tmp/versions.json) && \
    wget -q --continue -O /tmp/chromedriver-linux64.zip "$CHROMEDRIVER_URL" && \
    unzip /tmp/chromedriver-linux64.zip -d /opt/chromedriver && \
    chmod +x /opt/chromedriver/chromedriver-linux64/chromedriver && \
    rm /tmp/chrome-linux64.zip /tmp/chromedriver-linux64.zip /tmp/versions.json

# Set up ChromeDriver Environment variables
ENV CHROMEDRIVER_DIR /opt/chromedriver
ENV PATH $CHROMEDRIVER_DIR:$PATH

# Set NLTK data directory and permissions
RUN mkdir -p /usr/local/share/nltk_data && chown -R myuser:myuser /usr/local/share/nltk_data

# Create directory for screenshots with proper permissions
RUN mkdir -p /app/screenshots && \
    chown -R myuser:myuser /app/screenshots && \
    chmod 777 /app/screenshots
    

# Create logs directory with proper permissions
RUN mkdir -p /app/logs && \
    chown -R myuser:myuser /app/logs && \
    chmod 777 /app/logs

# Upgrade pip and install Python dependencies
RUN pip install --no-cache-dir --upgrade pip setuptools wheel

# Install any needed packages specified in requirements.txt
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the current directory contents into the container at /app
COPY --chown=myuser:myuser . .

# # Additional Chrome flags to handle browser extensions
# ENV CHROME_OPTS="--disable-dev-shm-usage --disable-gpu --no-sandbox --headless --disable-software-rasterizer --disable-extensions --disable-plugins --disable-sync --disable-background-networking --disable-default-apps --disable-translate --disable-web-security --disable-features=IsolateOrigins,site-per-process"

# Environment variables for optimization
ENV PYTHONDOWNWRITEBUFFERSIZE=65536 \
    PYTHONALLOWIMPORTFROMDISK=0 \
    PYTHONMALLOC=malloc \
    PYTHONDEVMODE=0 \
    LAVAGUE_TELEMETRY=NONE \
    SELENIUM_HEADLESS=true \
    SELENIUM_DISABLE_DEV_SHM=true \
    PYTHONWARNINGS="ignore::DeprecationWarning,ignore::UserWarning,ignore::RuntimeWarning" \
    NODE_ENV=production \
    CHROME_OPTS="--disable-dev-shm-usage --disable-gpu --no-sandbox --headless --disable-software-rasterizer --disable-extensions --disable-plugins --disable-sync --disable-background-networking --disable-default-apps --disable-translate --disable-web-security --disable-features=IsolateOrigins,site-per-process" \
    DISPLAY=:99 \
    NAME=SDET-Genie \
    NLTK_DATA=/usr/local/share/nltk_data \
    PYTHONUNBUFFERED=1 \
    PATH="/home/myuser/.local/bin:${PATH}" \
    FLASK_APP=run.py \
    FLASK_ENV=production

# Make port 10000 available
EXPOSE 10000

# Switch to non-root user
USER myuser

# Add startup script
RUN echo '#!/bin/bash\n\
rm -f /tmp/.X99-lock\n\
Xvfb :99 -screen 0 1280x1024x16 &\n\
sleep 1\n\
# Ensure directories exist and have proper permissions\n\
mkdir -p /app/screenshots\n\
mkdir -p /app/logs\n\
python run.py\n\
' > /home/myuser/start.sh && chmod +x /home/myuser/start.sh

# Set the command to run the startup script
CMD ["/home/myuser/start.sh"]

# PORT: 10000 
# PYTHON_ENV: production
# NLTK_DATA: /usr/local/share/nltk_data
# PYTHON_VERSION=3.10.0
# GOOGLE_API_KEY=AIzaSyDkP68ZaeHeZZi105o9NSg--sgGZv2TPBE
# CHROME_OPTS: "--disable-dev-shm-usage --disable-gpu --no-sandbox --headless --disable-software-rasterizer --disable-extensions"

# Health Check Path: /api/health-check

# docker build -t rickyrichardson/qa-sdet:latest .

# docker push rickyrichardson/qa-sdet:latest

# docker.io/rickyrichardson/qa-sdet:latest
