# from app import create_app

# app = create_app()

# if __name__ == '__main__':
#     app.run(debug=True)

import os
from app import create_app
import nltk
import warnings


# Suppress warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)
warnings.filterwarnings("ignore", category=UserWarning)

# Download NLTK data at startup
nltk.download('punkt', download_dir='/usr/local/share/nltk_data', quiet=True)
nltk.download('stopwords', download_dir='/usr/local/share/nltk_data', quiet=True)

app = create_app()

# Add a health check route
@app.route('/')
def health_check():
    return {"status": "healthy"}, 200

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 10000))
    app.run(host='0.0.0.0', port=port)
