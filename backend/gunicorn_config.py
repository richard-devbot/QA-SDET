# import multiprocessing

# # Gunicorn config
# bind = "0.0.0.0:$PORT"
# workers = multiprocessing.cpu_count() * 2 + 1
# threads = 2
# worker_class = "gthread"
# worker_connections = 1000
# timeout = 300
# keepalive = 2

# # Memory optimization
# max_requests = 1000
# max_requests_jitter = 50
# worker_tmp_dir = "/dev/shm"

# # Logging
# accesslog = "-"
# errorlog = "-"
# loglevel = "info"

# def on_starting(server):
#     """
#     Clean up any existing Chrome processes on startup
#     """
#     import os
#     os.system("pkill chrome")
#     os.system("pkill chromedriver")
